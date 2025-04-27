import React, { useState, useRef, useEffect } from 'react';
import { Fab, Box, Card, CardContent, IconButton, TextField, Button, Typography, Stack, CircularProgress, Divider, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

interface Event {
    id: string;
    name: string;
    difficultyLevel: string;
    date: string;
}

interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const ChatbotWidget = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatMessage = (text: string) => {
        // Split the text into sections based on numbered lists and headers
        const sections = text.split(/(\d+\.\s+[^:]+:)/g);
        
        return sections.map((section, index) => {
            if (section.match(/^\d+\.\s+[^:]+:/)) {
                // This is a header section
                return (
                    <Box key={index} sx={{ mt: 2, mb: 1 }}>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                fontWeight: 'bold', 
                                color: 'primary.main',
                                fontSize: '1.1rem',
                                borderBottom: '2px solid',
                                borderColor: 'primary.main',
                                pb: 0.5
                            }}
                        >
                            {section.replace(/\*/g, '')}
                        </Typography>
                    </Box>
                );
            } else if (section.trim()) {
                // This is a content section
                return (
                    <Box key={index} sx={{ mb: 1 }}>
                        {section.split('\n').map((line, lineIndex) => {
                            if (line.trim().startsWith('* ')) {
                                // This is a bullet point
                                return (
                                    <Box 
                                        key={lineIndex} 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'flex-start', 
                                            mb: 1,
                                            pl: 1
                                        }}
                                    >
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                mr: 1,
                                                color: 'primary.main',
                                                fontSize: '1.2rem',
                                                lineHeight: 1
                                            }}
                                        >
                                            •
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                lineHeight: 1.5,
                                                color: 'text.secondary'
                                            }}
                                        >
                                            {line.replace(/^\*\s+/, '').replace(/\*/g, '')}
                                        </Typography>
                                    </Box>
                                );
                            } else if (line.trim()) {
                                // This is a regular line
                                return (
                                    <Typography 
                                        key={lineIndex} 
                                        variant="body2" 
                                        sx={{ 
                                            mb: 1,
                                            lineHeight: 1.5,
                                            color: 'text.secondary'
                                        }}
                                    >
                                        {line.replace(/\*/g, '')}
                                    </Typography>
                                );
                            }
                            return null;
                        })}
                    </Box>
                );
            }
            return null;
        });
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        
        // Add user message to history
        const userMessage: Message = {
            text: input,
            isUser: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SPORTIFY_SERVER_URL}/suggestions/text-suggestions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await res.json();
            
            // Add bot response to history
            const botMessage: Message = {
                text: data.suggestions,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setEvents(data.availableEvents);
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            // Add error message to history
            const errorMessage: Message = {
                text: "Sorry, I couldn't process your request. Please try again.",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleEventClick = (eventId: string) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <>
            {/* FAB Button */}
            {!open && (
                <Fab
                    color="primary"
                    sx={{ 
                        position: 'fixed', 
                        bottom: 24, 
                        right: 24, 
                        zIndex: 9999,
                        boxShadow: 4,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                            boxShadow: 6,
                            background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                        }
                    }}
                    onClick={() => setOpen(true)}
                >
                    <SmartToyIcon sx={{ fontSize: 28 }} />
                </Fab>
            )}

            {/* Chatbot Box */}
            {open && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        width: { xs: 300, sm: 350 },
                        height: { xs: 400, sm: 450 },
                        backgroundColor: 'background.paper',
                        boxShadow: 6,
                        borderRadius: 2,
                        overflow: 'hidden',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ 
                        p: 1.5, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        backgroundColor: 'primary.main', 
                        color: 'primary.contrastText',
                        flexShrink: 0 
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SportBot</Typography>
                        <IconButton 
                            size="small" 
                            onClick={() => setOpen(false)} 
                            sx={{ 
                                color: 'inherit',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Main content area */}
                    <Box sx={{ 
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        backgroundColor: '#f5f5f5'
                    }}>
                        {messages.length === 0 ? (
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: '100%',
                                color: 'text.secondary'
                            }}>
                                <SmartToyIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                                <Typography variant="body2">
                                    Ask me about sport events!
                                </Typography>
                            </Box>
                        ) : (
                            messages.map((message, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                    }}
                                >
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: message.isUser ? 'primary.main' : 'white',
                                            color: message.isUser ? 'primary.contrastText' : 'text.primary',
                                            boxShadow: message.isUser ? 2 : 1,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <CardContent sx={{ p: 1.5 }}>
                                            {message.isUser ? (
                                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                                    {message.text}
                                                </Typography>
                                            ) : (
                                                <Box sx={{ minWidth: '200px' }}>
                                                    {formatMessage(message.text)}
                                                </Box>
                                            )}
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    display: 'block', 
                                                    mt: 0.5, 
                                                    opacity: 0.7,
                                                    textAlign: message.isUser ? 'right' : 'left'
                                                }}
                                            >
                                                {message.timestamp.toLocaleTimeString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))
                        )}

                        {/* Events list */}
                        {events.length > 0 && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                        mb: 1, 
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Recommended Events:
                                </Typography>
                                <Stack spacing={1}>
                                    {events.map((event) => (
                                        <Card
                                            key={event.id}
                                            variant="outlined"
                                            onClick={() => handleEventClick(event.id)}
                                            sx={{ 
                                                cursor: 'pointer', 
                                                backgroundColor: 'white',
                                                '&:hover': { 
                                                    backgroundColor: 'grey.100',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.2s ease-in-out',
                                                    boxShadow: 2
                                                } 
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="subtitle2">{event.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Level: {event.difficultyLevel} | {new Date(event.date).toLocaleDateString()}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input */}
                    <Box
                        sx={{
                            p: 1.5,
                            borderTop: '1px solid #eee',
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end',
                            flexShrink: 0,
                            backgroundColor: 'white'
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            fullWidth
                            multiline
                            maxRows={3}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    '& fieldset': {
                                        borderColor: 'divider',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        />
                        <Button
                            onClick={handleSend}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                minWidth: '80px',
                                height: '40px',
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Send'}
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ChatbotWidget;
