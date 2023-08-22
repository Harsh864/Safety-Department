import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
    const url = 'http://localhost:3000/';

    return (
        <div className="qrcode-container">
            <h2>Scan the QR Code</h2>
            <QRCode value={url} />
        </div>
    );
};

export default QRCodeGenerator;
