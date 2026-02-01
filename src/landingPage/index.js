import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import Header from '../components/header/Header';
import Hero from './hero/Hero';
import WhyUse from './whyUse/WhyUse';
import How from './how/How';
import Copi from './copi/Copi';
import Faq from './faq/Faq';
import ContactUs from './contactUs/ContactUs';
import Popi from './popi/Popi';

import './index.scss';

class Index extends Component {
    whyUseRef = React.createRef();
    howRef = React.createRef();
    copiRef = React.createRef();
    popiRef = React.createRef();
    faqRef = React.createRef();
    contactRef = React.createRef();
    state = {
        theme: '',
        activePage: '',
        openCommodities: false,
    }

    listenScrollEvent = e => {
        if (window.scrollY > 80) {
            this.setState({ theme: 'blue' })
        } else if (window.scrollY === 0) {
            this.setState({ theme: '' })
        }
        
        if (this.getYposition(this.contactRef.current).bottom <= window.innerHeight || this.getYposition(this.contactRef.current).y <= 200){
            this.setState({ activePage: 'contact'})
        } else if (this.getYposition(this.faqRef.current).y <= 60){
            this.setState({ activePage: 'faq'})
        } else if (this.getYposition(this.copiRef.current).y <= 60){
            this.setState({ activePage: 'copi'})
        } else if (this.getYposition(this.popiRef.current).y <= 60){
            this.setState({ activePage: 'popi'})
        } else if (this.getYposition(this.howRef.current).y <= 60){
            this.setState({ activePage: 'how'})
        } else if (this.getYposition(this.whyUseRef.current).y <= 60){
            this.setState({ activePage: 'why-use'})
        } else {
            this.setState({ activePage: ''})
        }
    }

    scrollTo = (page, openCommodities, scrollBehavior='smooth') => {
        if(openCommodities) this.setState({openCommodities});
        switch (page) {
            case 'why':
                this.whyUseRef.current.scrollIntoView({
                    behavior: 'smooth',
                })
                break
            case 'how':
                this.howRef.current.scrollIntoView({
                    behavior: 'smooth',
                })
                break
            case 'copi':
                this.copiRef.current.scrollIntoView({
                    behavior: 'smooth',
                })
                break
                case 'popi':
                    this.popiRef.current.scrollIntoView({
                        behavior: 'smooth',
                    })
                    break
            case 'faq':
                this.faqRef.current.scrollIntoView({
                    behavior: 'smooth',
                })
                break
            case 'contact':
                this.contactRef.current.scrollIntoView({
                    behavior: 'smooth',
                })
                break
            default:
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: scrollBehavior,
                })
        }
    }

    getYposition = (element) => {
        if(element){
            const domNode = ReactDOM.findDOMNode(element);
            return domNode.getBoundingClientRect();
        }
    }

    componentDidMount() {
        const { location } = this.props;
        const section = location.state?.section;
        
        if(section) this.scrollTo(section);

        window.addEventListener('scroll', this.listenScrollEvent)
        smoothscroll.polyfill();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent)
    }

    setToFalse = () => {
        this.setState({ openCommodities: false })
    }

    render() {
        const { theme, activePage, openCommodities } = this.state;
        return (
            <main className="landing-page">
                <Header 
                    theme={theme}
                    active={activePage}
                    logoAction={this.scrollTo}
                    scrollTo={this.scrollTo}
                />
                <Hero openCommodities={openCommodities} setToFalse={this.setToFalse} />
                <WhyUse ref={this.whyUseRef}/>
                <How ref={this.howRef}/>
                <Copi ref={this.copiRef}/>
                <Popi ref={this.popiRef} scrollTo={this.scrollTo}/>
                <Faq setRef={this.faqRef}/>
                <ContactUs ref={this.contactRef} scrollTo={this.scrollTo}  setToFalse={this.setToFalse} />
            </main>
        )
    }
}

export default withRouter(Index);
