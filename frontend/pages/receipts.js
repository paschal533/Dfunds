import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';

const Receipts = (props) => {
  const [ donation, setDonation ] = useState(null);
  const [ fundName, setFundName ] = useState(null);
  const [ date, setDate ] = useState(null);

  useEffect(() => {
    const { donation, date, fund } = props.router.query;
    
    const formattedDate = new Date(parseInt(date));

    //setDonation(donation);
    setDate(formattedDate.toString());
    setFundName(fund);
  }, []);

  return (
    <div className="text-white h-[80vh] md:ml-0 ml-3 flex mt-6 md:mt-[-100px] flex-col items-center justify-center py-2">
      <h3 className="text-2xl font-bold mb-8">Thank you for your donation to {fundName}</h3>

      <div>
        <div className="mb-3">Date of Donation: {date}</div>
        <div>Donation Value: ${donation?.slice(0, 4)}</div>
      </div>
    </div>
  )
}

export default withRouter(Receipts);