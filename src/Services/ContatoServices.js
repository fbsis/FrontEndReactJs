import apiConfig from "../Config/apiConfig";
import axios from 'axios';

class ContatoServices {
  async getAll() {
    try {
      const resource = await axios.get(`${apiConfig.url()}/`);
      return resource;
    } catch (error) {
      return error;
    }
  }

  async Post(id, data) {
    try {
      return await axios.Post(`${apiConfig.url}/${id}`, data);
    } catch (error) {
      return error;
    }
  }

  async Put(id, data) {
    try {
      return await axios.put(`${apiConfig.url}/${id}`, data);
    } catch (error) {
      return error;
    }
  }

  async Delete(id) {
    try {
      return await axios.Delete(`${apiConfig.url}/${id}`);
    } catch (error) {
      return error;
    }
  }
}

export default new ContatoServices();
