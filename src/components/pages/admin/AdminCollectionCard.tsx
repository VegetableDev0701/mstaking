import React, { useState } from "react";
import Image from "next/image";
import AdminCollectionCardContent from "./AdminCollectionCardContent";
import { motion } from "framer-motion";
import { Collection } from "@/interface/collection";
interface AdminCollectionCardProps {
  colData: Collection
}

const AdminCollectionCard = ({colData} : AdminCollectionCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  return (
    <>
      {isDropdownOpen && (
        <div className="mt-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AdminCollectionCardContent setDropdown={setIsDropdownOpen} colData={colData}/>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AdminCollectionCard;
