import React, { Component } from 'react';
import LogoReact from '../../../../static/react.svg';
import LogoGraphQL from '../../../../static/graphql.svg';
import LogoApollo from '../../../../static/apollo.svg';
import SSLogo from '../../../../static/ss_logo.jpg';
import style from './style.css';
import { Link } from 'react-router-dom';

const Presentation = () => (
    <div className={style.prWrapper}>
        <img className={style.logoSoftServe} src={SSLogo} />
        <div className={style.prMiddle}>
            <div className={style.prLogos}>
                <img className={style.prImgLogo} src={LogoGraphQL} />
                <img className={style.prImgLogo} src={LogoApollo} />
                <img className={style.prImgLogo} src={LogoReact} />
            </div>
        </div>
        <div className={style.prMiddle}>
            <div className={style.prAgenda}>
                <div className={style.prHeader}>Introducing into GraphQL</div>
                <ul className={style.prAgendaList}>
                    <li>Simple data schema and type</li>
                    <li>GraphQL with real database (example with MongoDB)</li>
                    <li><Link to={'/posts'}> GraphQL + React (using Apollo)</Link></li>
                </ul>
            </div>
        </div>
    </div>
);

export default Presentation;