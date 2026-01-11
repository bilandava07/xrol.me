import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

function PhotoOverlay({ selectedPhoto, handleCloseOverlay }) {

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!selectedPhoto) return;
    setImageLoaded(false);

    const img = new Image();
    img.src = selectedPhoto.fullResUrl;
    img.onload = () => setImageLoaded(true);
  }, [selectedPhoto]);

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
            <div className="relative pointer-events-auto text-white max-h-[85vh] w-auto max-w-[90vw] md:max-w-[70vw] 2xl:max-w-[90vw] flex flex-col lg:flex-row items-start gap-6">


              {imageLoaded ? (
                <>
                  {/* IMAGE */}
                  <img
                    src={selectedPhoto.fullResUrl}
                    alt={selectedPhoto.title}
                    className="max-h-[60vh] lg:max-h-[85vh] w-auto rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* METADATA */}
                  <div className="mt-4 lg:mt-0 text-left w-full lg:w-auto">
                    <h2 className="text-base lg:text-xl font-semibold mb-4">{selectedPhoto.title}</h2>
                    <div className="space-y-2 text-xs md:text-sm">
                      {selectedPhoto.metadata?.ISO && <p><span className="font-medium">ISO:</span> {selectedPhoto.metadata.ISO}</p>}
                      {selectedPhoto.metadata?.ShutterSpeed && <p><span className="font-medium">Shutter:</span> {selectedPhoto.metadata.ShutterSpeed}</p>}
                      {selectedPhoto.metadata?.Aperture && <p><span className="font-medium">Aperture:</span> f/{selectedPhoto.metadata.Aperture}</p>}
                      {selectedPhoto.metadata?.LensModel && <p><span className="font-medium">Lens:</span> {selectedPhoto.metadata.LensModel}</p>}
                      {selectedPhoto.metadata?.CameraModel && <p><span className="font-medium">Camera:</span> {selectedPhoto.metadata.CameraModel}</p>}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-[60vh] lg:h-[85vh]">
                  <Spinner className="h-12 w-12 text-white" />
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
