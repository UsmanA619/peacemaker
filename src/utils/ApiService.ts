
export class ApiService {
  url = 'http://yameenyousuf.com/';
  // url = 'https://orca-app-azjtu.ondigitalocean.app/';
  // url = 'http://10.0.2.2:3000/';
  Route = '';
  token = '';
  options = {};
  // serverCheck = useAppSelector(state => state.server.isLocalServer);

  constructor(Route: string, token: string) {
    this.Route = Route;
    this.token = token;
  }

  // refreshMyToken = async () => {
  //   // let data = await localStorage.getItem('token')
  //   // this.token = JSON.parse(data)

  //   const userReq = new ApiService('users/login')
  //   const userRes = await userRes.
  // };

  Get = async () => {
    // Getting all data from table

    try {
      const response = await fetch(this.url + this.Route, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      });

      const Data = await response.json();

      return Data;
    } catch (error) {
      console.log(error);
    }
  };

  GetById = async (Id: string) => {
    //Getting Data by id
    let address = this.url + this.Route + '/' + Id ;

    try {
      const response = await fetch(address, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      });

      const Data = await response.json();

      return Data;
    } catch (error) {
      console.error(error);
    }
  };


  Update = async (params: object) => {
    //Getting Data by id
    let address = this.url + this.Route;

    try {
      const response = await fetch(address, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(params),
      });

      const Data = await response.json();

      return Data;
    } catch (error) {
      console.error(error);
    }
  };




  Post = async (params: object) => {

    try {
      const response = await fetch(this.url + this.Route, {
        method: 'POST',
        headers: {
          // 'x-token-auth': this.token,
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  //   PostById = async (params: object) => {
  //     //posting data by ID
  //     await this.getApiToken();

  //     try {
  //       const response = await fetch(this.url + this.Route, {
  //         method: 'POST',
  //         headers: {
  //           'x-token-auth': this.token,
  //           accept: 'application/json',
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify(params),
  //       });

  //       return await response;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  UpdateById = async (params: object) => {
    //updating table by id

    try {
      const response = await fetch(this.url + this.Route, {
        method: 'PATCH',
        headers: {
          // 'x-token-auth': this.token,
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  // UNSECURED REQUEST (NO AUTHORIZATION)

  unsecuredGetById = async (Id: string) => {
    //Getting Data by id
    let address = this.url + this.Route + '/' + Id;

    // await this.getApiToken();

    try {
      const response = await fetch(address, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const Data = await response.json();

      return Data;
    } catch (error) {
      console.error(error);
    }
  };

  unsecuredPost = async (params: object, statusReq?: boolean) => {
    console.log(this.url + this.Route);

    try {
      const response = await fetch(this.url + this.Route, {
        method: 'POST',
        headers: {
          //   accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if(statusReq){
        return response.status;  
      }

      const Data = await response.json();

      
      return {...Data,status: response.status};
    } catch (error) {
      console.error(error);
    }
  };

  unsecuredPatch = async (params: object) => {
    console.log(this.url + this.Route);

    try {
      const response = await fetch(this.url + this.Route, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
}
