import axios from "axios";

export const createOrUpdateUser = async (authtoken,name,pin,role,mobile,address,id,status,images) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    { name,mobile,pin,address,role,id,status,images},
    {
      headers: {
        authtoken,
       
      },
    }
  );
};

export const login=async(authtoken)=>{
  return await axios.post(
    `${process.env.REACT_APP_API}/login`,{},{
      headers:{
        authtoken
      }
    }
  );
};
export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
