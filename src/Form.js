import React from 'react';   

class Form extends React.Component{

    constructor(props){
        super(props);
        this.state={
            iframeUrl: '',
            isPreview: false,
            strippedString:'',
            error:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.renderIframe = debounce(300,this.renderIframe.bind(this));
    } 
    renderIframe = (e) =>{
         
            let url = e.target.value;
            var validUrlRegex=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        
            if (validUrlRegex.test(url)){ 
                //check if protocol is present
                if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
                    url = "http://" + url;
                }
                this.setState({
                    iframeUrl: url
                }); 
            } else {
                console.log('Not a valid URL');
            } 
        
        
       
    }
    injectScript = (e) =>{
        const OriginalString = e.target.value;  
        const HtmlTagRegex = /(<([^>]+)>)/ig; 
        if (HtmlTagRegex.test(OriginalString)){
            //removing <script> tag and storing as string
            this.setState({
                strippedString:OriginalString.replace(HtmlTagRegex,"")
            });  
        }

    }  
    handleSubmit = (e) =>{
        e.preventDefault();
        const {strippedString, iframeUrl} = this.state; 

        if(iframeUrl && strippedString ){
    
            const scriptNode = document.getElementById("scriptInjection"); 
            if(scriptNode){
                scriptNode.innerHTML = ''; 
                scriptNode.innerHTML = strippedString;
                
                document.body.appendChild(scriptNode);  
            }
            else{
                const s = document.createElement('script');
                s.id="scriptInjection"; 
                s.innerHTML = strippedString;
                document.body.appendChild(s); 
            }
            this.setState({ isPreview: true });
        }
        else if(!iframeUrl && strippedString ){  
            this.setState({ 
                isPreview: false,
                error: 'Please enter a iframe URL.'
             });
        }
        else if(iframeUrl && !strippedString ){  
            this.setState({ 
                isPreview: false,
                error: 'Please enter valid script code.'
             });
        }
        else{  
            this.setState({ 
                isPreview: false,
                error: 'Please enter a valid iframe URL and script code.'
             });
             setTimeout(()=>{
                this.setState({ 
                    isPreview: false,
                    error: ''
                 });
             },1500)
        }
    }

    render(){
        const {iframeUrl, isPreview, error} = this.state
        return(
            <>
            {
                !isPreview && <> 
                    <div className="container">
                        <div className="container-left">
                            <svg width="172px" height="45px" viewBox="0 0 172 45" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="" fillRule="evenodd"><g id="sparrow-logo-copy-2"><g id="logo-text" transform="translate(0.000000, 15.600000)"><g id="survey"><path d="M0,9.65260491 L1.18031824,7.69116491 C1.95264382,8.41529684 3.47621787,9.11997895 4.76493268,9.11997895 C5.94374541,9.11997895 6.50228886,8.67263298 6.50228886,8.03228491 C6.50228886,6.34763088 0.364332925,7.73305684 0.364332925,3.68300491 C0.364332925,1.95496281 1.86682987,0.440868772 4.61287638,0.440868772 C6.35023256,0.440868772 7.74583843,1.03782877 8.77560588,1.84873684 L7.68110159,3.76678877 C7.05932681,3.12793684 5.87900857,2.57436491 4.61287638,2.57436491 C3.62676867,2.57436491 2.98241126,3.00076491 2.98241126,3.57528281 C2.98241126,5.08937684 9.1399388,3.81017684 9.1399388,7.96795088 C9.1399388,9.86655298 7.51097919,11.2519789 4.63395349,11.2519789 C2.83186047,11.2519789 1.09450428,10.6550189 0,9.65260491" id="Fill-1"></path><path d="M17.9197601,10.9959893 L17.9197601,9.69584337 C17.2106659,10.4633634 15.9671163,11.2518293 14.2719143,11.2518293 C11.9970918,11.2518293 10.9251701,10.0145213 10.9251701,8.01118933 L10.9251701,0.696559158 L13.6501395,0.696559158 L13.6501395,6.94444126 C13.6501395,8.3732553 14.3998825,8.84304337 15.5591236,8.84304337 C16.6114737,8.84304337 17.4485361,8.26702933 17.9197601,7.67006933 L17.9197601,0.696559158 L20.646235,0.696559158 L20.646235,10.9959893 L17.9197601,10.9959893 Z" id="Fill-3"></path><path d="M23.1303231,10.9959893 L23.1303231,0.696559158 L25.8552925,0.696559158 L25.8552925,2.08348126 C26.606541,1.18729319 27.8696622,0.440719158 29.158377,0.440719158 L29.158377,3.08439916 C28.965672,3.04250723 28.7293072,3.02156126 28.408634,3.02156126 C27.5053293,3.02156126 26.3054394,3.53324126 25.8552925,4.1945353 L25.8552925,10.9959893 L23.1303231,10.9959893 Z" id="Fill-5"></path><polygon id="Fill-7" points="33.9952729 10.9959893 29.8325435 0.696559158 32.7517234 0.696559158 35.4541102 7.8615753 38.1790796 0.696559158 41.096754 0.696559158 36.93553 10.9959893"></polygon><path d="M46.5774051,2.65904646 C44.8822032,2.65904646 44.1535373,3.83202049 44.0451408,4.85538049 L49.1518237,4.85538049 C49.0660098,3.87391242 48.3794982,2.65904646 46.5774051,2.65904646 M41.2132803,5.83684856 C41.2132803,2.85055242 43.4444431,0.441766456 46.5774051,0.441766456 C49.6877846,0.441766456 51.7699021,2.74432646 51.7699021,6.09119242 L51.7699021,6.73154049 L44.0662179,6.73154049 C44.2604284,7.98979453 45.2901958,9.03410049 47.0486291,9.03410049 C47.9293513,9.03410049 49.1292411,8.67203453 49.7961812,8.03168646 L51.0186536,9.8240626 C49.9888862,10.7621426 48.3584211,11.2513805 46.7475275,11.2513805 C43.5964994,11.2513805 41.2132803,9.1418226 41.2132803,5.83684856" id="Fill-9"></path><path d="M53.3874198,12.5950641 C53.6222791,12.7012901 53.986612,12.7656241 54.2455594,12.7656241 C54.9546536,12.7656241 55.4258776,12.5741182 55.6833195,12.0190501 L56.0687295,11.1243582 L51.8638458,0.69625993 L54.7815202,0.69625993 L57.486918,7.86127607 L60.2103819,0.69625993 L63.1295618,0.69625993 L58.2577381,12.6803441 C57.486918,14.6208382 56.1138947,15.1325182 54.3313733,15.1759062 C54.0317772,15.1759062 53.322683,15.1115722 53.0020098,15.0038501 L53.3874198,12.5950641 Z" id="Fill-11"></path></g><g id="sparrow" transform="translate(94.186047, 0.860000)"><path d="M0.279458996,9.2754094 L1.45827173,7.3139694 C2.23210282,8.03810133 3.75567687,8.74278344 5.04288617,8.74278344 C6.2216989,8.74278344 6.78024235,8.29543747 6.78024235,7.6550894 C6.78024235,5.97043537 0.643791922,7.35586133 0.643791922,3.3058094 C0.643791922,1.5777673 2.14478335,0.0636732632 4.89082987,0.0636732632 C6.62969155,0.0636732632 8.02529743,0.660633263 9.05355936,1.47154133 L7.96056059,3.38959326 C7.33728029,2.75074133 6.15696206,2.1971694 4.89082987,2.1971694 C3.90472215,2.1971694 3.26036475,2.6235694 3.26036475,3.1980873 C3.26036475,4.71218133 9.41789229,3.43298133 9.41789229,7.59075537 C9.41789229,9.48935747 7.78893268,10.8747834 4.91341248,10.8747834 C3.11131946,10.8747834 1.37396328,10.2778234 0.279458996,9.2754094" id="Fill-13"></path><path d="M18.9424884,5.4590546 C18.9424884,3.68912056 17.8705667,2.47275846 16.3048384,2.47275846 C15.4241163,2.47275846 14.4380086,2.96498863 13.9652791,3.64722863 L13.9652791,7.27088056 C14.4169315,7.9321746 15.4241163,8.46480056 16.3048384,8.46480056 C17.8705667,8.46480056 18.9424884,7.2499346 18.9424884,5.4590546 M13.9652791,9.2966546 L13.9652791,14.5421227 L11.2418152,14.5421227 L11.2418152,0.319812491 L13.9652791,0.319812491 L13.9652791,1.6214546 C14.7601873,0.619040561 15.8968458,0.0639724912 17.162978,0.0639724912 C19.8232105,0.0639724912 21.7532717,2.02541249 21.7532717,5.4590546 C21.7532717,8.89120056 19.8232105,10.8750827 17.162978,10.8750827 C15.9405055,10.8750827 14.8234186,10.3634027 13.9652791,9.2966546" id="Fill-15"></path><path d="M29.8191812,8.14522498 L29.8191812,6.86602498 C29.3690343,6.26906498 28.5108947,5.94889095 27.6316781,5.94889095 C26.5582509,5.94889095 25.6790343,6.52490498 25.6790343,7.50637305 C25.6790343,8.48634498 26.5582509,9.04141305 27.6316781,9.04141305 C28.5108947,9.04141305 29.3690343,8.74218498 29.8191812,8.14522498 L29.8191812,8.14522498 Z M29.8191812,10.618345 L29.8191812,9.53065095 C29.1100869,10.3849471 27.8876144,10.874185 26.5356683,10.874185 C24.8856316,10.874185 22.9525594,9.76554498 22.9525594,7.46298498 C22.9525594,5.03175691 24.8856316,4.13706498 26.5356683,4.13706498 C27.9312742,4.13706498 29.1326695,4.58441095 29.8191812,5.39531902 L29.8191812,4.09367691 C29.8191812,3.04937095 28.9173819,2.36713095 27.5443586,2.36713095 C26.4513599,2.36713095 25.4200869,2.79353095 24.5619474,3.58199691 L23.4900257,1.68489095 C24.7561579,0.555304982 26.386623,0.0645709474 28.0170881,0.0645709474 C30.3988017,0.0645709474 32.5652277,1.00265095 32.5652277,3.96650498 L32.5652277,10.618345 L29.8191812,10.618345 Z" id="Fill-17"></path><path d="M35.0237222,10.6189434 L35.0237222,0.319513263 L37.7486916,0.319513263 L37.7486916,1.70643537 C38.49994,0.810247298 39.7630612,0.0636732632 41.051776,0.0636732632 L41.051776,2.70735326 C40.859071,2.66546133 40.6227062,2.64451537 40.302033,2.64451537 C39.3987283,2.64451537 38.1988384,3.15619537 37.7486916,3.8174894 L37.7486916,10.6189434 L35.0237222,10.6189434 Z" id="Fill-19"></path><path d="M42.4543072,10.6189434 L42.4543072,0.319513263 L45.1792766,0.319513263 L45.1792766,1.70643537 C45.9305251,0.810247298 47.1936463,0.0636732632 48.4823611,0.0636732632 L48.4823611,2.70735326 C48.2896561,2.66546133 48.0532913,2.64451537 47.7326181,2.64451537 C46.8293133,2.64451537 45.6294235,3.15619537 45.1792766,3.8174894 L45.1792766,10.6189434 L42.4543072,10.6189434 Z" id="Fill-21"></path><path d="M57.418153,5.4590546 C57.418153,3.85968056 56.4741995,2.47275846 54.7564149,2.47275846 C53.061213,2.47275846 52.1172595,3.85968056 52.1172595,5.4590546 C52.1172595,7.0793746 53.061213,8.46480056 54.7564149,8.46480056 C56.4741995,8.46480056 57.418153,7.0793746 57.418153,5.4590546 M49.285399,5.4590546 C49.285399,2.53709249 51.3464394,0.0639724912 54.7564149,0.0639724912 C58.1904786,0.0639724912 60.2500135,2.53709249 60.2500135,5.4590546 C60.2500135,8.37952056 58.1904786,10.8750827 54.7564149,10.8750827 C51.3464394,10.8750827 49.285399,8.37952056 49.285399,5.4590546" id="Fill-23"></path><polygon id="Fill-25" points="71.0765728 10.6189434 68.8890698 3.60354133 66.7000612 10.6189434 63.7808813 10.6189434 60.6283476 0.319513263 63.4602081 0.319513263 65.3917748 7.24963537 67.6650918 0.319513263 70.0904651 0.319513263 72.3637821 7.24963537 74.2953488 0.319513263 77.1482864 0.319513263 73.9942472 10.6189434"></polygon></g></g><path d="M75.6716475,2.1937906 L75.6038996,2.18780604 C75.578306,2.18630989 75.4413048,2.17134849 75.2139731,2.17134849 C74.1435569,2.17134849 71.4095545,2.4496306 69.1046218,5.03196884 L67.9815129,6.30368814 L75.5316353,8.77381586 L66.2020024,28.901392 L67.6427736,28.485465 C68.6891016,28.1847408 69.6962864,27.8062173 70.6357234,27.3633597 C74.3227124,25.6278369 76.6607662,23.3985878 77.8606561,20.0262874 L79.4399339,20.0921176 C76.2106193,29.3457457 65.4853807,30.5172236 65.0216842,30.5621078 L62.9034345,30.7745597 L60.4976328,36.0080587 L61.7231163,35.979632 C79.5784406,35.3841681 87.8557234,24.9710313 87.9942301,15.5438509 C88.0830551,9.28399972 84.3027246,2.72641656 75.6716475,2.1937906" id="bird-fill" fillOpacity="0" fill="#8FF2D3"></path><path d="M76.2935728,0.0694209123 L74.1271469,0.0694209123 C72.4153843,0.27439214 69.7491297,1.02695074 67.4607576,3.58983916 L64.1501457,7.3436553 L72.5117368,10.080096 L62.5889339,31.4868721 L65.0910881,31.240009 C65.5848947,31.1921325 77.2315043,29.9234055 80.307257,19.6389367 L80.3057515,19.6359444 L77.2570979,19.6359444 C76.0903293,22.7344511 73.777869,25.1297718 70.3422999,26.7500918 C69.3095214,27.2363374 68.3083586,27.5849381 67.4517246,27.8318013 L76.4757393,8.36402302 L69.1800477,5.9791753 L69.6181506,5.4824567 C72.2151518,2.57395986 75.4158617,2.85373811 75.5408188,2.86421109 L75.6145887,2.87318793 C83.8105741,3.37888337 87.393683,9.59684267 87.307869,15.5350237 C87.1768898,24.6480146 79.1073672,34.7185353 61.7006842,35.2975416 L60.8154455,35.3274644 L56.7159474,44.1876076 L59.8805251,44.1876076 L62.6898029,38.1192623 C81.3626181,37.1542518 90.037355,25.8389423 90.1848947,15.5754195 C90.3083464,7.11923425 84.6175263,0.818987228 76.2935728,0.0694209123" id="bird" fill="#13C4A3"></path></g></g></svg>

                            <form className="wt-embed-form" onSubmit={this.handleSubmit}>
                                <h1> Preview your Widget</h1>
                                <p>Enter the URL, paste the embed code. See the widget in action!</p>
                                <input className="wt-input" onChange={(e)=>this.renderIframe(e)} placeholder="Enter URL" /> 
                                <textarea className="wt-input" rows={'5'} onChange={(e)=>this.injectScript(e)} placeholder="Paste the embed script" /> 
                                
                                { <p className="wt-error-msg">{error}</p> }
                                
                                <button  className="wt-button wt-button--orange" onClick={e=>this.handleSubmit(e)} >Preview <svg width="16" height="16" className="ml--xl" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.8333 5.5C10.8333 5.22386 10.6094 5 10.3333 5H0.999918C0.723776 5 0.499918 5.22386 0.499918 5.5C0.499918 5.77614 0.723776 6 0.999918 6H10.3333C10.6094 6 10.8333 5.77614 10.8333 5.5Z" fill="#FFFFFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M5.29506 0.665523C5.11033 0.870779 5.12697 1.18692 5.33223 1.37165L9.93383 5.51306L5.3192 9.97384C5.12065 10.1658 5.11529 10.4823 5.30721 10.6808C5.49914 10.8794 5.81567 10.8848 6.01422 10.6928L11.0143 5.8595C11.1139 5.76314 11.1691 5.62972 11.1667 5.4911C11.1642 5.35247 11.1043 5.2211 11.0012 5.12836L6.00119 0.628356C5.79593 0.443627 5.47979 0.460268 5.29506 0.665523Z" fill="#FFFFFF"></path></svg></button> 
                            </form>
                        </div>
                        <div className="container-right">
                             
                            <div className="flex_column ss-onboarding-preview-container">

                                    <div className="flex_row ss-onboarding-preview-header"><span></span><span></span><span></span><h6>your-website.com<svg width="64" version="1.1" xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 64 64"><g><path fill="#1D1D1B" d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"></path></g></svg></h6></div>
                                    <div className="ss-onboarding-preview-body">
                                        <img src="https://static.surveysparrow.com/site/assets/wt-bg-img.png" />
                                    </div>

                            </div> 
                        </div>
                    </div>
                </>
            }
            {
                isPreview && <> 
                    <iframe className="preview-iframe" title={'dont know'} height="500" width="500" src={iframeUrl} />
                </>
            }
 
            </>
        )
    }
}

export default Form