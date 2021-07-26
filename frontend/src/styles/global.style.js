import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body{
        background-color: #ededed;
        overflow: hidden;
    }
    section{
        background-color: #e1e1e1;
    }
    main{
        background-color: #ebebeb;
    }
    .iconsTam{
        font-size: 11px;
    }
    .scroll-style::-webkit-scrollbar-thumb{
        background-color:#d7d7d7;
        border-radius: 5px;
    }
    .scroll-style::-webkit-scrollbar{
        background-color: #ebebeb;
        height: 7px;
    }
    .scroll-style::-webkit-scrollbar-corner{
        background-color: #ebebeb;
    }

    @media print {
        *{
            -webkit-print-color-adjust: exact;
            background-color: #ffffff;
            text-shadow:none;
            filter:none;
            -ms-filter:none;
        }
        a{ 
            display:none; 
        }
    }
`;