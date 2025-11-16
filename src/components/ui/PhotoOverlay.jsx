import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

function PhotoOverlay({ selectedPhoto, handleCloseOverlay }) {
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
            <div className="relative pointer-events-auto text-white max-w-full">

              {/* IMAGE */}
              <img
                src={selectedPhoto.fullResUrl}
                alt={selectedPhoto.title}
                className=" max-h-[85vh] max-w-[70vw] rounded-lg shadow-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
              />

              {/* METADATA */}
              <div
                className="
                mt-6                      /* mobile & tablet: below image */

                lg:mt-0                   /* desktop: remove margin */
                lg:text-left              /* desktop: align left */
                
                lg:absolute               /* desktop: position beside image */
                lg:top-0                 
                lg:left-full              /* desktop: to right edge of image */
                lg:ml-6                   /* spacing */
                w-max
              "
              >
                <h2 className=" text-base lg:text-xl font-semibold mb-4">{selectedPhoto.title}</h2>

                <div className="space-y-2 text-xs md:text-sm w-max">
                  {selectedPhoto.metadata?.ISO && (
                    <p><span className="font-medium">ISO:</span> {selectedPhoto.metadata.ISO}</p>
                  )}
                  {selectedPhoto.metadata?.ShutterSpeed && (
                    <p><span className="font-medium">Shutter:</span> {selectedPhoto.metadata.ShutterSpeed}</p>
                  )}
                  {selectedPhoto.metadata?.Aperture && (
                    <p><span className="font-medium">Aperture:</span> f/{selectedPhoto.metadata.Aperture}</p>
                  )}
                  {selectedPhoto.metadata?.LensModel && (
                    <p><span className="font-medium">Lens:</span> {selectedPhoto.metadata.LensModel}</p>
                  )}
                  {selectedPhoto.metadata?.CameraModel && (
                    <p><span className="font-medium">Camera:</span> {selectedPhoto.metadata.CameraModel}</p>
                  )}
                </div>
              </div>

            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>
  );
}

export default PhotoOverlay;
