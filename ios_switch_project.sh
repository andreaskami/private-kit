 rm -rf ./ios/Pods

if [ ! -d "ios_privateKit" ];
then
    mv ./ios ./ios_privateKit
    mv ./ios_privateKit/iosCovTracer ./ios
    cd ios && pod install
fi

if [ -d "ios_privateKit" ];
then
    mv ./ios ./ios_privateKit/iosCovTracer
    mv ./ios_privateKit ./ios
    cd ios && pod install
fi