
// Simple React Native specific changes
const URI = 'http://192.168.92.2:8000';

export default {
    async fetchConfig() {
        try {
            let response = fetch('http://192.168.92.2:8000/api/register').then((response) => response.json());
            //let responseJsonData = response.json();
            console.log(response);
            return response;
        }
        catch(e) {
            console.log(e)
        }
    }
}