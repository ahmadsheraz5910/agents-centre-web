import { env } from "../env";

export const GLOBAL_CONFIG = {
    googlePlacesAPI:{
        key:env.NEXT_PUBLIC_GOOGLE_API_KEY,
        callbackName:"YOUR_CALLBACK_NAME"
    }
}