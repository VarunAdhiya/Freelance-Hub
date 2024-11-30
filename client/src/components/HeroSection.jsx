import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="text-center bg-[#F7EFE5] py-16">
            <div className="flex flex-col gap-6 my-1">
                <span className="mx-auto px-4 py-2 rounded-full bg-[#E2BFD9] text-[#674188] font-medium">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-bold text-[#674188]">
                    Search, Apply & <br /> Get Your{' '}
                    <span className="text-[#6A38C2]">Dream Jobs</span>
                </h1>
                <p className="text-[#674188]"> Connect with employers and land jobs effortlessly. 
                    <br /> Explore a wide range of opportunities across industries and skill sets.
                </p>
                <div className="flex w-[40%] shadow-lg border border-[#C8A1E0] pl-3 rounded-full items-center gap-4 mx-auto bg-white">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-[#674188] placeholder-[#C8A1E0]"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] hover:bg-[#674188] text-white"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
