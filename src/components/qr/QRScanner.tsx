import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Camera, X } from 'lucide-react';
import { QRCodeService, QRCodeData } from '@/services/qrCodeService';
import { campusLocations } from '@/data/campusLocations';

interface QRScannerProps {
  onScan: (data: QRCodeData) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
    // Simulate scanning a QR code for demo
    const mockLocation = campusLocations[0];
    const qrData = QRCodeService.generateQRData(mockLocation);
    onScan(qrData);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          QR Scanner
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning ? (
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <Camera className="w-16 h-16 text-muted-foreground" />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="space-y-2">
              <Button onClick={startCamera} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
              <Button variant="outline" onClick={simulateQRScan} className="w-full">
                Demo Scan
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-48 bg-black rounded-lg"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={stopCamera} className="flex-1">
                Stop
              </Button>
              <Button onClick={simulateQRScan} className="flex-1">
                Simulate Scan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}