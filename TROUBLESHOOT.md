## Android

```
Caused by: com.android.builder.errors.EvalIssueException: Failed to parse XML in /node_modules/react-native-i18n/android/src/main/AndroidManifest.xml
The minSdk version should not be declared in the android manifest file. You can move the version from the manifest to the defaultConfig in the build.gradle file.
```

Change "react-native-i18n": "2.0.14" in package.json

---

```
/node_modules/@mauron85/react-native-background-geolocation/android/common/src/main/java/com/marianhello/bgloc/Config.java:15: error: package android.support.annotation does not exist
```

npx jetify

---

```
com.android.builder.internal.aapt.v2.Aapt2Exception: Android resource linking failed
AAPT: /Users/christopherdro/Desktop/OSS/react-native-maps/lib/android/build/intermediates/res/merged/release/layout/notification_template_big_media_custom.xml:63: error: resource style/TextAppearance.Compat.Notification.Time.Media (aka com.airbnb.android.react.maps:style/TextAppearance.Compat.Notification.Time.Media) not found.
```

cd android; ./gradlew clean

## iOS
