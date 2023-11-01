import React, { useContext, useState } from "react";
import FormloginRegister from "../login-register/Form-login-register";
import disp_banner from '../../Images/temp_homebanner.jpg'

export default function Home() {
    return (
        <div className="home-page">
            <section className="container">
                <div className="column col-70">
                    <div className="img-display">
                        <img src={disp_banner} alt="" />
                    </div>
                </div>
                <div className="column col-30">
                    <FormloginRegister/>
                </div>
            </section>
            <section className="container">
                <div className="column col-100">
                    <div className="img-display">
                        <img src={disp_banner} alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
}