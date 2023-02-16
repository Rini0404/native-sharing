import axios from 'axios';

export const get = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios
        .get('https://api.spoonacular.com/recipes/complexSearch?apiKey=bd085f5beee3423d8e110af2d1a9e182');
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

}
