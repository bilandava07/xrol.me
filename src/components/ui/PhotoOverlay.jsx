import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function PhotoOverlay({ selectedPhoto, handleCloseOverlay }) {

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AnimatePresence>
      {selectedPhoto && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/95 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseOverlay}
          />

          {/* Close button */}
          <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="rounded-4xl cursor-pointer"
              size="sm"
              variant="secondary"
              onClick={handleCloseOverlay}
            >
              X
            </Button>
          </motion.div>

          {/* Content container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Outer container: limits height & makes content scrollable if too tall */}
            <div className="relative pointer-events-auto text-white max-h-[85vh] w-full max-w-[85vw] md:max-w-[70vw] flex flex-col lg:flex-row items-start gap-6">

              {/* IMAGE */}
              <img
                src={selectedPhoto.fullResUrl}
                alt={selectedPhoto.title}
                className="max-h-[60vh] lg:max-h-[85vh] w-full lg:w-auto object-contain rounded-lg shadow-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setImageLoaded(true)}
              />

              {/* METADATA */}
              {imageLoaded && (
                <div className="mt-4 lg:mt-0 text-left w-full lg:w-auto">
                  <h2 className="text-base lg:text-xl font-semibold mb-4">{selectedPhoto.title}</h2>
                  <div className="space-y-2 text-xs md:text-base">
                    {selectedPhoto.metadata?.ISO && <p><span className="font-medium">ISO:</span> {selectedPhoto.metadata.ISO}</p>}
                    {selectedPhoto.metadata?.ShutterSpeed && <p><span className="font-medium">Shutter:</span> {selectedPhoto.metadata.ShutterSpeed}</p>}
                    {selectedPhoto.metadata?.Aperture && <p><span className="font-medium">Aperture:</span> f/{selectedPhoto.metadata.Aperture}</p>}
                    {selectedPhoto.metadata?.LensModel && <p><span className="font-medium">Lens:</span> {selectedPhoto.metadata.LensModel}</p>}
                    {selectedPhoto.metadata?.CameraModel && <p><span className="font-medium">Camera:</span> {selectedPhoto.metadata.CameraModel}</p>}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>
  );
}

export default PhotoOverlay;
