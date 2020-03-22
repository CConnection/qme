# qme

**The Problem:**
The main transmission pathway of COVID-19 is the close contact between people. To prevent the virus from spreading further it is crucial to avoid person-on-person contacts as much as possible. This is especially true for full waiting rooms of doctor’s offices or long queues at testing centers. A minimal distance of 1 – 1.5 meters is recommended to protect yourself from getting infected. However it would be best if people would not meet at all.

**Our Solution:**
We are developing a dynamic queue list in a web application. Each user will be able to register from home and get the information when it is his or her time to go. The doctor’s offices or testing centers will have the possibility to individually define these lists in regard to their needs and capacities. Risk groups like the elderly will be prioritized.

## Development

### Perquisites

Make sure that you have the latest version of `npm` installed.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install 10.16.2
nvm alias default 10.16.2
```

Make sure not to use the root-installed version of `npm` but one created by `nvm` otherwise there will be problems.

### Install dependencies, test and run

Install the node dependencies

```bash
./run.sh install_dependencies
```

Make sure all dependencies have been correctly installed by running the tests

```bash
./run.sh test
```

If you want to test the backend and frontend locally, you must login into firebase. It is necessary that you are logged in in your browser into a valid Google Account. You will be asked, if Firebase may access your Google account.

```bash
./node_modules/.bin/firebase login
```

Then you have to choose an alias to use (make sure that you have an properly configured one). See [[1]](https://firebase.google.com/docs/cli), [[2]](https://firebase.google.com/docs/guides), [[3]](https://firebase.google.com/docs/admin/setup#initialize-sdk), [[4]](https://cloud.google.com/datastore/docs/firestore-or-datastore) for further details. You need to create an firebase project with a web app. With the services Firestore, Hosting and CloudFunctions. Make sure that you use the correct region (`eur3 (europe-west)`).


```bash
./node_modules/.bin/firebase use dev
```

Start frontend and backend concurrently

```bash
./run.sh run
```

## Contributions welcome!

We are are happy to receive your contributions via a pull request. The core developers will review and merge it to master. Then it is continuously deployed.
