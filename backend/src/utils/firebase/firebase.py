import pyrebase

class FirebaseHelper:
    config = {
        "apiKey": "AIzaSyA3p00JBNuQhvYCTjwaJwg2rrV2w8breKI",
        "authDomain": "elephant-learn.firebaseapp.com",
        "databaseURL": "https://elephant-learn.firebaseio.com",
        "storageBucket": "elephant-learn.appspot.com"
    }

    firebase = pyrebase.initialize_app(config)

    def __init__(self):
        self.storage = self.firebase.storage()
        self.database = self.firebase.database()

    def uploadFile(self, remotePath, filePath):
        try:
            self.storage.child(remotePath).put(filePath)
            print('successful upload file ', filePath)
        except:
            print('error upload file to firebase ', filePath)

    def uploadDatabase(self, remotePath, data):
            self.database.child(remotePath).update(data)
            print('successful upload data ', remotePath)
            # print('error upload data to firebase ', remotePath)
