import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, featuredImage, content, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionID,
        slug,
        { title, slug, featuredImage, status, userId, content }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, featuredImage, content, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionID,
        slug,
        { title, featuredImage, status, content }
      );
    } catch (error) {
      console.log("update post :: " + error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPosts(qureies = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionID,
        qureies
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //upload file methods

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deletePost(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  getFilePreview(fileID) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
  }
}

const service = new Service();

export default service;
