import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScanner = (props) => {
  const [data, setData] = useState('');

  useEffect(() => {
    console.info(data);
    props.passData(data);
  }, [data,props]);


  return (
    <>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 order-1 lg:order-2 flex flex-col gap-12 lg:gap-10 justify-center items-center  " >
          <div className="relative w-full h-full p-6 lg:p-8 bg-slate-200 rounded-3xl">
          <span className="absolute w-1/2 bg-violet-500 -z-10 rounded-3xl -top-3 -right-3 lg:-top-5 lg:-right-5 h-1/2"></span>
            <span className="absolute w-1/2 bg-violet-500 -z-10 rounded-3xl -bottom-3 -left-3 lg:-bottom-5 lg:-left-5 h-1/2"></span>
      <QrReader
      
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        
              
        style={{ width: '10%'
         }}
      />
      </div>
      {/* <div class="lg:hidden w-1/3 h-2 bg-indigo-500 rounded"></div> */}
      </div>
    </>
  );
};

export default QrScanner;