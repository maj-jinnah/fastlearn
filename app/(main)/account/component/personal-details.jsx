'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const PersonalDetails = ({userInfo}) => {

    const [infoState, setInfoState] = useState({
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email ,
        designation: userInfo?.designation,
        bio: userInfo?.bio,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfoState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        console.log("Submitting personal details:", infoState);
    }

    return (
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
            <form onSubmit={handleSubmit} >
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">
                            First Name : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            name="firstName"
                            value={infoState.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Last Name : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            name="lastName"
                            value={infoState.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Your Email : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={infoState.email}
                            disabled
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Designation :</Label>
                        <Input
                            name="name"
                            id="designation"
                            name="designation"
                            type="text"
                            value={infoState.designation}
                            onChange={handleChange}
                            placeholder="Designation "
                        />
                    </div>
                </div>
                {/*end grid*/}
                <div className="grid grid-cols-1">
                    <div className="mt-5">
                        <Label className="mb-2 block">Bio :</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={infoState.bio}
                            onChange={handleChange}
                            placeholder="Enter you bio here"
                        />
                    </div>
                </div>
                {/*end row*/}
                <Button className="mt-5" asChild>
                    <input type="submit" name="send" value="Save Changes" />
                </Button>
            </form>
            {/*end form*/}
        </div>
    );
};

export default PersonalDetails;
