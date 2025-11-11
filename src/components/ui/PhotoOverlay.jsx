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

          {/* Image container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div
              className="pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PhotoOverlay;
