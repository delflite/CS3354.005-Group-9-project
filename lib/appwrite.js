import { Client, Account, Avatars } from 'appwrite';
import 'react-native-url-polyfill/auto'

export const client = new Client()

  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('68fd61330019c6201354');
  //.setPlatform('com.mySkills.app'); 

  export const account = new Account(client)
  export const avatars = new Avatars(client)