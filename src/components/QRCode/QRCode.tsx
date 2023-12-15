import React, { useEffect, useRef } from 'react'
/**
 * The `QRCode` component generates and displays a customizable QR code. It's particularly useful in applications
 * where QR codes are required for sharing links, embedding information, or for identification purposes, such as in 
 * event ticketing or product packaging. This component adapts to various customization needs like size, color, and 
 * embedded images, aligning with the specific branding or design requirements of the application.
 *
 * @component
 * @param {Options} props - The configuration options for the QR code. These options control various aspects of the QR code's 
 * appearance and content. For detailed information on the available options, refer to the [QR Code Styling API documentation](https://github.com/kozakdenys/qr-code-styling#api-documentation).
 *
 * @example
 * // To create a simple QR code linking to a website
 * <QRCode data="https://example.com" width={150} height={150} />
 *
 * @example
 * // To create a QR code with a custom color scheme and a logo
 * <QRCode data="https://example.com" width={200} height={200} dotsOptions={{ color: '#000' }} image="path/to/logo.png" />
 */
export const QRCode: React.FC<any> = (props) => {
  const qrContainerRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import QRCodeStyling
    const QRCodeStyling = require('qr-code-styling')
    qrCodeRef.current = new QRCodeStyling(props)

    if (qrContainerRef.current) {
      qrCodeRef.current.append(qrContainerRef.current)
    }
  }, [])

  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.update(props)
    }
  }, [props])

  return <div ref={qrContainerRef} />
}