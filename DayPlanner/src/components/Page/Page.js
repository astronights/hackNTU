import React, {useEffect, useState} from "react";
import { UserProvider } from "../../UserContext";
import axios from 'axios';
import API from '../../utils/API';

const Page = ({ children }) => {

    const [data, setData] = useState([]);

    useEffect(function(){ (async () => {
        console.log('mounting PAGE');
        let apiData = await API.get('/');
        // console.log(apiData);
        setData(apiData.data);

    })()}, []);

    return (
        <UserProvider
            value={data}
        >
            <div className="page">{children}</div>
        </UserProvider>
    );
};
export default Page;
