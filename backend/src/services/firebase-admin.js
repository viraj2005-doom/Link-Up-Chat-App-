import admin from "firebase-admin"

let firebaseApp = null
let firebaseAppConfigKey = null

const getFirebaseAdminConfig = () => ({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
})

export const isFirebaseAdminConfigured = () =>
    Boolean(getFirebaseAdminConfig().projectId && getFirebaseAdminConfig().clientEmail && getFirebaseAdminConfig().privateKey)

const getFirebaseAdminApp = () => {
    const firebaseAdminConfig = getFirebaseAdminConfig()

    if (!isFirebaseAdminConfigured()) {
        throw new Error("Firebase Admin environment variables are missing")
    }

    const nextConfigKey = JSON.stringify({
        projectId: firebaseAdminConfig.projectId,
        clientEmail: firebaseAdminConfig.clientEmail,
        privateKey: firebaseAdminConfig.privateKey,
    })

    if (!firebaseApp || firebaseAppConfigKey !== nextConfigKey) {
        if (firebaseApp) {
            firebaseApp.delete().catch(() => {})
        }

        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(firebaseAdminConfig),
        })
        firebaseAppConfigKey = nextConfigKey
    }

    return firebaseApp
}

export const verifyFirebaseIdToken = async (idToken) => {
    const app = getFirebaseAdminApp()
    return admin.auth(app).verifyIdToken(idToken)
}
