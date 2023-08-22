import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import './Home.css'

import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const [pdfUrls, setPdfUrls] = useState([]);
    const [pdfFileNames, setPdfFileNames] = useState([]);
    const [filteredPdfUrls, setFilteredPdfUrls] = useState([]);
    const [filteredPdfFileNames, setFilteredPdfFileNames] = useState([]);
    const [showAll, setShowAll] = useState(true);

    const { userQuery } = useSelector(store => store);
    const searchQuery = useSelector(store => store.userQuery.query);

    useEffect(() => {
        if (!firebase.apps.length) {
            const firebaseConfig = {
                apiKey: "AIzaSyDmrhxsIFPv3sefhl8JQGV53Ghw393O6qQ",
                authDomain: "socialogram-2334c.firebaseapp.com",
                projectId: "socialogram-2334c",
                storageBucket: "socialogram-2334c.appspot.com",
                messagingSenderId: "638754635147",
                appId: "1:638754635147:web:6204bd675768580f4d838e",
                measurementId: "G-H2GMBVSFDL"

            };
            firebase.initializeApp(firebaseConfig);
        }

        const storage = firebase.storage();
        const storageRef = storage.ref();
        const pdfsRef = storageRef.child('pdfs');

        pdfsRef.listAll().then((res) => {
            const pdfPromises = res.items.map((item) => {
                return Promise.all([item.getDownloadURL(), item.getMetadata()]);
            });
            Promise.all(pdfPromises).then((results) => {
                const urls = results.map(([url, metadata]) => url);
                setPdfUrls(urls);
                const fileNames = results.map(([url, metadata]) => metadata.name);
                setPdfFileNames(fileNames);
            });
        });
    }, []);

    useEffect(() => {
        if (searchQuery !== null) {
            const filteredUrls = pdfUrls.filter((url, index) =>
                pdfFileNames[index].toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPdfUrls(filteredUrls);
            const filteredNames = pdfFileNames.filter(name =>
                name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPdfFileNames(filteredNames);
        } else {
            setFilteredPdfUrls([]);
            setFilteredPdfFileNames([]);
        }
    }, [searchQuery, pdfUrls, pdfFileNames]);
    

    useEffect(() => {
        if (searchQuery !== null && searchQuery !== "") {
            setShowAll(false);
        } else {
            setShowAll(true);
        }
    }, [searchQuery]);

    return (
        <div className='box'>
            <h3>PDF's</h3>
            <ul>
                {showAll ? (
                    pdfFileNames.map((fileName, index) => (
                        <li key={index}>
                            <a href={pdfUrls[index]} className='link' target="_blank" rel="noopener noreferrer">
                                {fileName}
                            </a>
                        </li>
                    ))
                ) : (
                    filteredPdfFileNames.map((fileName, index) => (
                        <li key={index}>
                            <a href={filteredPdfUrls[index]} target="_blank" rel="noopener noreferrer">
                                {fileName}
                            </a>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default Home;
