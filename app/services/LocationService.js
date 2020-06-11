import { GetStoreData, SetStoreData } from '../helpers/General'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { Platform, Alert, Linking } from 'react-native'
import PushNotification from 'react-native-push-notification'
import languages from '../locales/languages'

const LOCATION_DISABLED_NOTIFICATION = '55'
let isBackgroundGeolocationConfigured = false

export class LocationData {
  constructor () {
    // The desired location interval, and the minimum acceptable interval
    this.locationInterval = 60000 * 5 // Time (in milliseconds) between location information polls.  E.g. 60000*5 = 5 minutes
  }

  getLocationData () {
    return GetStoreData('LOCATION_DATA').then(locationArrayString => {
      let locationArray = []
      if (locationArrayString !== null) {
        locationArray = JSON.parse(locationArrayString)
      }

      return locationArray
    })
  }

  async getPointStats () {
    const locationData = await this.getLocationData()

    let lastPoint = null
    let firstPoint = null
    let pointCount = 0

    if (locationData.length) {
      lastPoint = locationData.slice(-1)[0]
      firstPoint = locationData[0]
      pointCount = locationData.length
    }

    return {
      lastPoint,
      firstPoint,
      pointCount
    }
  }

  saveLocation (location) {
    // Persist this location data in our local storage of time/lat/lon values
    this.getLocationData().then(locationArray => {
      // Always work in UTC, not the local time in the locationData
      const nowUTC = new Date().toISOString()
      const unixtimeUTC = Date.parse(nowUTC)
      const unixtimeUTC_14daysAgo = unixtimeUTC - 60 * 60 * 24 * 1000 * 14

      // Curate the list of points, only keep the last 14 days
      const curated = []
      for (let i = 0; i < locationArray.length; i++) {
        if (locationArray[i]['time'] > unixtimeUTC_14daysAgo) {
          curated.push(locationArray[i])
        }
      }

      // Backfill the stationary points, if available
      if (curated.length >= 1) {
        const lastLocationArray = curated[curated.length - 1]
        let lastTS = lastLocationArray['time']
        for (; lastTS < unixtimeUTC - this.locationInterval; lastTS += this.locationInterval) {
          curated.push(JSON.parse(JSON.stringify(lastLocationArray)))
        }
      }

      // Save the location using the current lat-lon and the
      // calculated UTC time (maybe a few milliseconds off from
      // when the GPS data was collected, but that's unimportant
      // for what we are doing.)
      console.log('[GPS] Saving point:', locationArray.length)
      const lat_lon_time = {
        latitude: location['latitude'],
        longitude: location['longitude'],
        time: unixtimeUTC
      }
      curated.push(lat_lon_time)

      SetStoreData('LOCATION_DATA', curated)
    })
  }
}

export default class LocationServices {
  static async start () {
    const locationData = new LocationData()

    // handles edge cases around Android where start might get called again even though
    // the service is already created.  Make sure the listeners are still bound and exit
    if (isBackgroundGeolocationConfigured) {
      BackgroundGeolocation.start()
      return
    }

    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      // onNotification (notification) {
      //   console.log('NOTIFICATION:', notification)
      //   // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      //   notification.finish(PushNotificationIOS.FetchResult.NoData)
      // },
      // Setting the permissions to true causes a crash on Android, because that configuration requires Firebase
      // https://github.com/zo0r/react-native-push-notification#usage
      requestPermissions: Platform.OS === 'ios'
    })

    BackgroundGeolocation.configure({
      maxLocations: 0,
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 5,
      distanceFilter: 5,
      notificationTitle: languages.t('label.ENABLED'),
      notificationText: languages.t('label.intro2_para1'),
      debug: false,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: locationData.locationInterval,
      fastestInterval: locationData.locationInterval,
      activitiesInterval: locationData.locationInterval,
      activityType: 'AutomotiveNavigation',
      pauseLocationUpdates: false,
      saveBatteryOnBackground: true,
      stopOnStillActivity: false
    })

    BackgroundGeolocation.on('error', error => {
      console.log('[ERROR] BackgroundGeolocation error:', error)
    })

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started')
    })

    BackgroundGeolocation.on('authorization', status => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status)

      if (status === BackgroundGeolocation.AUTHORIZED) {
        // TODO: this should not restart if user opted out
        BackgroundGeolocation.start() // force running, if not already running
        BackgroundGeolocation.checkStatus(geolocationStatus => {
          if (!geolocationStatus.locationServicesEnabled) {
            PushNotification.localNotification({
              id: LOCATION_DISABLED_NOTIFICATION,
              title: languages.t('label.TRACKDISABLED'),
              message: languages.t('label.NEEDSLOCSERVICES')
            })
          } else {
            PushNotification.cancelLocalNotifications({
              id: LOCATION_DISABLED_NOTIFICATION
            })
          }
        })
      }
    })

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background')
      BackgroundGeolocation.start()
    })

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground')
    })

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required')
      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    })

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests')
    })

    BackgroundGeolocation.on('stop', () => {
      PushNotification.localNotification({
        title: languages.t('label.TRACKDISABLED'),
        message: languages.t('label.NEEDSLOCSERVICES')
      })
      console.log('[INFO] stop')
    })

    BackgroundGeolocation.on('stationary', stationaryLocation => {
      // handle stationary locations here
      // Actions.sendLocation(stationaryLocation);
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask

        // For capturing stationaryLocation. Note that it hasn't been
        // tested as I couldn't produce stationaryLocation callback in emulator
        // but since the plugin documentation mentions it, no reason to keep
        // it empty I believe.
        locationData.saveLocation(stationaryLocation)
        BackgroundGeolocation.endTask(taskKey)
      })
      console.log('[INFO] stationaryLocation:', stationaryLocation)
    })

    BackgroundGeolocation.on('location', location => {
      // handle your locations here
      /* SAMPLE OF LOCATION DATA OBJECT
                {
                  "accuracy": 20, "altitude": 5, "id": 114, "isFromMockProvider": false,
                  "latitude": 37.4219983, "locationProvider": 1, "longitude": -122.084,
                  "mockLocationsEnabled": false, "provider": "fused", "speed": 0,
                  "time": 1583696413000
                }
            */
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        locationData.saveLocation(location)
        BackgroundGeolocation.endTask(taskKey)
      })
    })

    if (Platform.OS === 'android') {
      // This feature only is present on Android.
      BackgroundGeolocation.headlessTask(async event => {
        // Application was shutdown, but the headless mechanism allows us
        // to capture events in the background.  (On Android, at least)
        if (event.name === 'location' || event.name === 'stationary') {
          locationData.saveLocation(event.params)
        }
      })
    }

    const {
      authorization,
      isRunning,
      locationServicesEnabled
    } = await this.getBackgroundGeoStatus()

    console.log('[INFO] BackgroundGeolocation service is running', isRunning)
    console.log('[INFO] BackgroundGeolocation services enabled', locationServicesEnabled)
    console.log('[INFO] BackgroundGeolocation auth status: ' + authorization)

    BackgroundGeolocation.start()
    isBackgroundGeolocationConfigured = true
  }

  static async stop () {
    PushNotification.localNotification({
      title: languages.t('label.TRACKDISABLED'),
      message: languages.t('label.NEEDSLOCSERVICES')
    })
    BackgroundGeolocation.removeAllListeners()
    BackgroundGeolocation.stop()
    isBackgroundGeolocationConfigured = false
    await SetStoreData('PARTICIPATE', 'false')
  }

  static async getBackgroundGeoStatus () {
    return new Promise((resolve, reject) => {
      BackgroundGeolocation.checkStatus(
        status => resolve(status),
        e => reject(e)
      )
    })
  }
}
