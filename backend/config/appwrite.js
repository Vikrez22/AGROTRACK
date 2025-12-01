// config/appwrite.js
import { Client, Storage } from 'node-appwrite';
import 'dotenv/config';


const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1') 
    .setProject(process.env.APPWRITE_PROJECT_ID) 
    .setKey(process.env.APPWRITE_API_KEY); 

const storage = new Storage(client);

export { storage, client };