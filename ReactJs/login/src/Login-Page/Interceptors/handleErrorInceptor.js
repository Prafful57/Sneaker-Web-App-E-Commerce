
const handleErrorInterceptor =(axiosInstance)=>{
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        },

        async (error)=>{
            const originalRequest = error.config;
            if(error.response.status===401 && !originalRequest._retry){
                originalRequest._retry=true;
                // const expired =jwt(localStorage.getItem("refreshToken")).exp <Date.now() / 1000;
                // console.log(expired);
                const token ={
                    refreshToken: localStorage.getItem("refreshToken"),
                };
                const response = await axiosInstance
                .post("login/token", token)
                .catch((err)=>console.log(err));

                localStorage.setItem("jwt",response.data.token);
                return axiosInstance(originalRequest);
            }
        }
    )
}
export default handleErrorInterceptor;