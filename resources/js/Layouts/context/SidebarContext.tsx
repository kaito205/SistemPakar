import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
    isExpanded: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
    setIsHovered: (value: boolean) => void;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile sidebar on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsExpanded(prev => !prev);
    };

    const toggleMobileSidebar = () => {
        setIsMobileOpen(prev => !prev);
    };

    return (
        <SidebarContext.Provider
            value={{
                isExpanded,
                isHovered,
                isMobileOpen,
                setIsHovered,
                toggleSidebar,
                toggleMobileSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
