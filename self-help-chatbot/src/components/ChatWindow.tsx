'use client'

import { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";

const drawerWidth = 240;

export default function ChatWindow() {
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async() => {
        if (!input.trim()) return;
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");
        setLoading(true);

        try{
            const response = await fetch('/api/chat',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({message : input})
            });

            const data = await response.json();
            setMessages(prev=> [...prev, {text : data.response , sender : "bot"}]);
        }
        catch(error){
             setMessages(prev => [...prev, { text: "Sorry, something went wrong.", sender: "bot" }]);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0a0e27' }}>
            <AppBar 
                position="fixed" 
                sx={{ 
                    width: `calc(100% - ${drawerWidth}px)`, 
                    ml: `${drawerWidth}px`,
                    bgcolor: '#1a1f3a',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 600 }}>
                        Self-Help Chatbot
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer 
                variant="permanent" 
                sx={{ 
                    width: drawerWidth, 
                    '& .MuiDrawer-paper': { 
                        width: drawerWidth,
                        bgcolor: '#13172e',
                        borderRight: '1px solid #2a2f4a'
                    } 
                }}
            >
                <Toolbar />
            </Drawer>

            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: '#0a0e27'
                }}
            >
                <Toolbar />
                
                <Box sx={{ 
                    flexGrow: 1, 
                    overflowY: 'auto', 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1.5,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        bgcolor: '#13172e',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: '#2a2f4a',
                        borderRadius: '4px',
                    },
                }}>
                    {messages.map((msg, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                p: 2,
                                maxWidth: '75%',
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                bgcolor: msg.sender === 'user' ? '#4a5fc1' : '#1e2337',
                                color: '#e0e0e0',
                                borderRadius: '12px',
                                boxShadow: msg.sender === 'user' 
                                    ? '0 4px 12px rgba(74, 95, 193, 0.3)' 
                                    : '0 4px 12px rgba(0, 0, 0, 0.4)',
                            }}
                        >
                            {msg.sender === 'bot' ? (
                                <div 
                                    dangerouslySetInnerHTML={{ __html: msg.text }}
                                    style={{
                                        lineHeight: '1.6',
                                        wordBreak: 'break-word',
                                    }}
                                />
                            ) : (
                                <Typography variant="body1">
                                    {msg.text}
                                </Typography>
                            )}
                        </Paper>
                    ))}
                    {loading && (
                        <Typography sx={{ alignSelf: 'flex-start', color: '#8b92b8', fontStyle: 'italic' }}>
                            Typing...
                        </Typography>
                    )}
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    p: 2, 
                    borderTop: '1px solid #2a2f4a',
                    bgcolor: '#13172e'
                }}>
                    <TextField
                        fullWidth
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: '#e0e0e0',
                                bgcolor: '#1a1f3a',
                                '& fieldset': {
                                    borderColor: '#2a2f4a',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#4a5fc1',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4a5fc1',
                                },
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: '#8b92b8',
                                opacity: 0.7,
                            },
                        }}
                    />
                    <IconButton 
                        onClick={handleSend} 
                        disabled={loading}
                        sx={{
                            color: '#4a5fc1',
                            bgcolor: '#1a1f3a',
                            '&:hover': {
                                bgcolor: '#252b4a',
                            },
                            '&.Mui-disabled': {
                                color: '#3a3f5a',
                            }
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}