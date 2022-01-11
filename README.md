# DACTR

This is the repository for DACTR (Depression Advisory Consulting Therapy Rehabilitation), a mental health journaling app that provides behavioral feedback to people of all ages, but particularly for college students who need help as they wait for an opportunity to talk with clinicians or therapists. This project was worked on by Penn State students Divyesh Johri, Yajur Tomar, Steven Zeng, TJ Schaeffer, Ankit Garikipati, Haskel Canagarajah, Neil Patel, Erica Mi, Sean Cullen, and Michael Mitole.

The app was submitted to the Nittany AI Competition and pitched to others as a solution to ease the burden on therapists and clinicians amidst the growing college mental health crisis. The minimum viable product (MVP) pitch can be seen in the YouTube video below:
## Check out our features
### DACTR Presentation
[![DACTR Presentation](http://img.youtube.com/vi/DpVwCKWFd8k/0.jpg)](https://www.youtube.com/watch?v=DpVwCKWFd8k)

The app was made using [NativeScript](https://nativescript.org/), a mobile development javascript framework, along with Google Cloud (NLP APIs and Cloud Functions), Firebase, and Google Maps. Developers worked using the Scrum and Kanban development frameworks, and the app was reviewed with our advisory board. Formal tech demos of the app can be seen in the YouTube videos below:

### DACTR Tech Demo
[![DACTR Tech Demo](http://img.youtube.com/vi/2tTkzdhkGiQ/0.jpg)](https://www.youtube.com/watch?v=2tTkzdhkGiQ)
### DACTR AI Demo
[![DACTR Tech Demo](http://img.youtube.com/vi/Hqq4ZpJXFCw/0.jpg)](https://www.youtube.com/watch?v=Hqq4ZpJXFCw)

## Getting Started
### Dependencies

1. Have Node.js installed
2. Install Nativescript CLI ```$ npm install -g nativescript```
3. Once installed enter dactr_app directory and run command: ```$ npm install```. This will install all the dependencies in the package.json file.
4. Download the Nativescript Playground app on your phone via the app store:  
  Apple Devices: [Click Here](https://apps.apple.com/us/app/nativescript-playground/id1263543946)  
  Android Devices: [Click Here](https://play.google.com/store/apps/details?id=org.nativescript.play&hl=en_US&gl=US)

### Run App
1. ```$ tns preview``` The command above will create a QR code that you can scan using the Nativescript Playground app. The app will then run within the NativeScript Playground interface.

For more information on the app, check the [documentation included in the repository](https://github.com/stevenzengg/dactr_app/blob/master/documentation/DACTR%20Documentation%20Final.pdf).

### Android Emulation:
1. Navigate to dactr_app directory and run ```$ tns run android```.
2. Run option 2 (configure for local builds) and allow the powershell script to install dependencies  
(OPTION 1) Navigate to the Android\android-sdk\tools\bin directory it installs and follow the steps in the command tools section of https://docs.nativescript.org/tooling/android-virtual-devices#setup-android-emulators
Instead of "system-images;android-25;google_apis;x86", use "system-images;android-28;google_apis;x86_64". Make sure to download the image first with sdkmanager, as it describes  
(OPTION 2) Go to https://www.genymotion.com/download/ and download your OS version (with VirtualBox if needed). When the software is opened, sign up with the option for personal use. Then choose an android decice image in their catalogue (with Android 8 or higher), accept the default settings, and run it.
3. To enable Google Play Services, click on the "Open GAPPS" button at the side of the VM and let it do its thing.
4. Back in the dactr_app directory, run ```$ tns run android``` again. Let the emulator load. If the app launch fails and the emulator is still loading itself, wait for the emulator to be fully loaded and try ```$ tns run android``` once again.

