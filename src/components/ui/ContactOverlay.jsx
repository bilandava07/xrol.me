import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';

function ContactOverlay({contactOverlay, handleCloseContactOverlay}) {
  return (
    <AnimatePresence>
      {contactOverlay && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/95 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseContactOverlay}
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
              onClick={handleCloseContactOverlay}
            >
              X
            </Button>
          </motion.div>

          {/* Contact form container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div
              className="pointer-events-auto w-[85vw] sm:w-5/6 md:w-4/6 lg:w-2/3 xl:w-3/7"
              onClick={(e) => e.stopPropagation()}
            >
                <ContactForm />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ContactOverlay;
