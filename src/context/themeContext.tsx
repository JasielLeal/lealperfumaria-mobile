import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'nativewind';

// Definindo a interface do contexto
interface ThemeContextProps {
    theme: string;
    toggleTheme: () => void;
}

// Criando o contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Componente ThemeProvider que fornecerá o tema e a função de alternar tema
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Hook do NativeWind para obter o esquema de cores
    const { colorScheme, toggleColorScheme } = useColorScheme();

    // Criando uma função para alternar o tema
    const toggleTheme = () => {
        toggleColorScheme();
    };

    return (
        <ThemeContext.Provider value={{ theme: colorScheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personalizado para usar o ThemeContext
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
};
