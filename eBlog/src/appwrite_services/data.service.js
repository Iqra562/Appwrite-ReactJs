import { Client, Databases, ID, Query,Storage } from "appwrite";
import config from "../config/config";
export class DataService{
    client  = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases= new Databases(this.client);
        this.storage = new Storage(this.client);
    }


    async createPost({title,slug,content,featuredImage,status,userId}){
try{
return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
    {
    title,
    content,
    featuredImage,
    status,
    userId
})
}catch(error){
    throw error
}
    }

    async  updatePost(slug,{title,content,featuredImage,status,}){
       try{
return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
    {
    title,
    content,
    featuredImage,
    status,
})
       }catch(error){
 throw error 
       } 
    }


    async deletePost(slug){
        try{
await this.databases.deleteDocument(
    config.appwriteDatabaseId,
    config.appwriteCollectionId,
    slug
)
return true
}catch(error){
    console.log('error',error)
return false
         }
    }

    async getSinglePost(slug){
        try{
return await this.databases.getDocument(
    config.appwriteDatabaseId,
    config.appwriteProjectId,
    slug
)

        }catch(error){
            console.log(error);
return false
        }
    }

    async getActivePost(queries=[Query.equal("status","active")]){
       try{
 return await this.databases.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteCollectionId,
    queries,
 )
       }catch(error){
throw error
       } 
    }

    async uploadFile(file){
        try{
return await this.storage.createFile(
config.appwriteBucketId,
 ID.unique(),
 file  
)
        }catch(error){
throw error;
        }
    }
}
const  dataService = new DataService();
export default dataService;