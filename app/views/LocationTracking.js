import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import colors from '../constants/colors';
import LocationServices from '../services/LocationService';
import BroadcastingServices from '../services/BroadcastingService';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import exportImage from './../assets/images/export.png';
import news from './../assets/images/newspaper.png';
import kebabIcon from './../assets/images/kebabIcon.png';
import pkLogo from './../assets/images/PKLogo.png';

import logo1 from './../assets/images/logo1.png';
import logo2 from './../assets/images/logo2.png';
import logo3 from './../assets/images/logo3.png';

import { GetStoreData, SetStoreData } from '../helpers/General';
import languages from './../locales/languages';

import Version from '../../ixnilatisApp/views/Version';
import CheckerButton from '../../ixnilatisApp/views/CheckerButton';

const width = Dimensions.get('window').width;

class LocationTracking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogging: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    GetStoreData('PARTICIPATE')
      .then(isParticipating => {
        if (isParticipating === 'true') {
          this.setState({
            isLogging: true,
          });
          this.willParticipate();
        } else {
          this.setState({
            isLogging: false,
          });
        }
      })
      .catch(error => console.log(error));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };
  export() {
    this.props.navigation.navigate('ExportScreen', {});
  }

  import() {
    this.props.navigation.navigate('ImportScreen', {});
  }

  overlap() {
    this.props.navigation.navigate('OverlapScreen', {});
  }

  willParticipate = () => {
    SetStoreData('PARTICIPATE', 'true').then(() => {
      LocationServices.start();
      // BroadcastingServices.start();
    });

    // Check and see if they actually authorized in the system dialog.
    // If not, stop services and set the state to !isLogging
    // Fixes tripleblindmarket/private-kit#129
    BackgroundGeolocation.checkStatus(({ authorization }) => {
      if (authorization === BackgroundGeolocation.AUTHORIZED) {
        this.setState({
          isLogging: true,
        });
      } else if (authorization === BackgroundGeolocation.NOT_AUTHORIZED) {
        LocationServices.stop(this.props.navigation);
        BroadcastingServices.stop(this.props.navigation);
        this.setState({
          isLogging: false,
        });
      }
    });
  };

  news() {
    this.props.navigation.navigate('NewsScreen', {});
  }

  licenses() {
    this.props.navigation.navigate('LicensesScreen', {});
  }

  notifications() {
    this.props.navigation.navigate('NotificationScreen', {});
  }

  privacy() {
    this.props.navigation.navigate('PrivacyScreen', {});
  }

  acknowledgement() {
    this.props.navigation.navigate('AckScreen', {});
  }

  setOptOut = () => {
    LocationServices.stop(this.props.navigation);
    BroadcastingServices.stop(this.props.navigation);
    this.setState({
      isLogging: false,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.main}>
          {/* A modal menu. Currently only used for license info */}
          <Menu
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              zIndex: 10,
            }}>
            <MenuTrigger style={{ marginTop: 14 }}>
              <Image
                source={kebabIcon}
                style={{
                  width: 15,
                  height: 28,
                  padding: 14,
                }}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  this.licenses();
                }}>
                <Text style={styles.menuOptionText}>Licenses</Text>
              </MenuOption>
              {/* IX Hide notifications temporarily */}
              <MenuOption
                onSelect={() => {
                  this.privacy();
                }}>
                <Text style={styles.menuOptionText}>Privacy</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  this.acknowledgement();
                }}>
                <Text style={styles.menuOptionText}>Acknowledgements</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>

          <View style={styles.buttonsAndLogoView}>
            {this.state.isLogging ? (
              <>
                <Image
                  source={pkLogo}
                  style={{
                    width: 132,
                    height: 164.4,
                    alignSelf: 'center',
                    marginTop: 12,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.setOptOut()}
                  style={styles.stopLoggingButtonTouchable}>
                  <Text style={styles.stopLoggingButtonText}>
                    {languages.t('label.stop_logging')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.overlap()}
                  style={styles.startLoggingButtonTouchable}>
                  <Text style={styles.startLoggingButtonText}>
                    {languages.t('label.overlap')}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image
                  source={pkLogo}
                  style={{
                    width: 132,
                    height: 164.4,
                    alignSelf: 'center',
                    marginTop: 12,
                    opacity: 0.3,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.willParticipate()}
                  style={styles.startLoggingButtonTouchable}>
                  <Text style={styles.startLoggingButtonText}>
                    {languages.t('label.start_logging')}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {this.state.isLogging ? (
              <Text style={styles.sectionDescription}>
                {languages.t('label.logging_message')}
              </Text>
            ) : (
              <Text style={styles.sectionDescription}>
                {languages.t('label.not_logging_message')}
              </Text>
            )}
          </View>

          <CheckerButton navigation={this.props.navigation} />

          <View style={styles.actionButtonsView}>
            <TouchableOpacity
              onPress={() => this.import()}
              style={styles.actionButtonsTouchable}>
              <Image
                style={styles.actionButtonImage}
                source={exportImage}
                resizeMode={'contain'}
              />
              <Text style={styles.actionButtonText}>
                {languages.t('label.import')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.export()}
              style={styles.actionButtonsTouchable}>
              <Image
                style={[
                  styles.actionButtonImage,
                  { transform: [{ rotate: '180deg' }] },
                ]}
                source={exportImage}
                resizeMode={'contain'}
              />
              <Text style={styles.actionButtonText}>
                {languages.t('label.export')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.news()}
              style={styles.actionButtonsTouchable}>
              <Image
                style={styles.actionButtonImage}
                source={news}
                resizeMode={'contain'}
              />
              <Text style={styles.actionButtonText}>
                {languages.t('label.news')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.rowContainer}>
              <Image source={logo1} style={styles.infoCardLogo} />
              <Image source={logo2} style={styles.infoCardLogo} />
              <Image source={logo3} style={styles.infoCardLogo} />
            </View>
            <Text
              style={[
                styles.sectionDescription,
                { textAlign: 'center', paddingTop: 15 },
              ]}>
              {languages.t('label.url_info')}{' '}
            </Text>
            <Text
              style={[
                styles.sectionDescriptionLow,
                { color: 'blue', textAlign: 'center', marginTop: 0 },
              ]}
              onPress={() =>
                Linking.openURL(languages.t('label.private_kit_url'))
              }>
              {languages.t('label.private_kit_url')}
            </Text>
            <Version />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // Container covers the entire screen
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  infoCardLogo: {
    alignSelf: 'center',
    marginTop: '10%',
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 38,
    padding: 0,
    fontFamily: 'OpenSans-Bold',
  },
  subHeaderTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 5,
  },
  main: {
    alignItems: 'center',
    width: '100%',
  },
  buttonsAndLogoView: {
    flex: 6,
    justifyContent: 'space-around',
  },
  actionButtonsView: {
    width: width * 0.7866,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
    alignItems: 'center',
    marginBottom: -10,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  sectionDescription: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'OpenSans-Regular',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    //IX
    textAlign: 'center',
    marginBottom: 2,
  },
  sectionDescriptionLow: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'OpenSans-Regular',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    //IX
    textAlign: 'center',
    marginBottom: 5,
  },
  startLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#665eff',
    height: 52,
    alignSelf: 'center',
    width: width * 0.7866,
    marginTop: 30,
    justifyContent: 'center',
    marginBottom: 20,
  },
  startLoggingButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  stopLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#fd4a4a',
    height: 52,
    alignSelf: 'center',
    width: width * 0.7866,
    marginTop: 30,
    justifyContent: 'center',
  },
  stopLoggingButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  actionButtonsTouchable: {
    height: 76,
    borderRadius: 8,
    backgroundColor: '#454f63',
    width: width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonImage: {
    height: 21.6,
    width: 32.2,
  },
  actionButtonText: {
    opacity: 0.56,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 6,
  },
  menuOptionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    padding: 10,
  },
});

export default LocationTracking;
