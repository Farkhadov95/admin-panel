const useAuth = () => {
    const token = localStorage.getItem('admin-token');
    return token ? true : false;
}

export default useAuth;
