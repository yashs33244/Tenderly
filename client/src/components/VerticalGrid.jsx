import React from 'react';
import TenderCard from './TenderCard';

const VerticalGrid = ({ tenders }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {tenders.map((tender) => (
        <TenderCard
          key={tender._id} // Assuming `_id` is a unique identifier for each tender
          title={tender.nameOfWork}
          tenderId = {tender._id}
          tenderNumber={tender.tenderNumber}
          location={tender.location}
          approxCost={tender.approxCost}
          bidSecurity={tender.bidSecurity}
          uploadDateTime={tender.uploadDateTime}
          phoneNumber={tender.phoneNumber}
          video={tender.video}
          pdf={tender.pdf}
          numberOfBids={tender.numberOfBids}
        />
      ))}
    </div>
  );
};

export default VerticalGrid;
