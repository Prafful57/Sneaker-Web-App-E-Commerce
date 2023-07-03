const updateHeaderInterceptor =(axiosInstance) =>{
    axiosInstance.interceptors.request.use(   
        //interceptor is act like middle thing between client and server the
        //request and response passes through interceptor
        (config)=>{
            const jwtToken = localStorage.getItem("jwt"); 
            config.headers["x-access-token"]=jwtToken;
            return config;
        },
        (error)=>{Promise.reject(error)}
    );
};

export default updateHeaderInterceptor;