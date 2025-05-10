import React, { useState, useRef, useEffect } from 'react';
import { Fab, Box, Card, CardContent, IconButton, TextField, Button, Typography, Stack, CircularProgress, Divider, Paper, Tooltip, Badge } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Utility to parse Markdown-style links and render as clickable links
    const renderWithLinks = (text: string) => {
        // Regex to match [label](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <a
                    key={match![2] + match!.index}
                    href={match![2]}
                    style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => {
                        // If it's an internal link, use navigate
                        if (match![2].startsWith('/events/')) {
                            e.preventDefault();
                            navigate(match![2]);
                        }
                    }}
                >
                    {match![1]}
                </a>
            );
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        return parts;
    };

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
                                                color: 'text.secondary',
                                                overflowWrap: 'break-word',
                                                wordBreak: 'break-word',
                                                overflowX: 'hidden',
                                            }}
                                        >
                                            {renderWithLinks(line.replace(/^\*\s+/, '').replace(/\*/g, ''))}
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
                                            color: 'text.secondary',
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                            overflowX: 'hidden',
                                        }}
                                    >
                                        {renderWithLinks(line.replace(/\*/g, ''))}
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
        
        const userMessage: Message = {
            text: input,
            isUser: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        setIsTyping(true);
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SPORTIFY_SERVER_URL}/suggestions/text-suggestions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await res.json();
            
            // Simulate typing delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const botMessage: Message = {
                text: data.suggestions,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setEvents(data.availableEvents);
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            const errorMessage: Message = {
                text: "Sorry, I couldn't process your request. Please try again.",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    const handleEventClick = (eventId: string) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <>
            <AnimatePresence>
                {!open && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Tooltip title="Chat with SportBot">
                            <Fab
                                color="primary"
                                sx={{ 
                                    position: 'fixed', 
                                    bottom: 24, 
                                    right: 24, 
                                    zIndex: 9999,
                                    boxShadow: 4,
                                    background: 'linear-gradient(45deg, #FF6B35 30%, #FF8B5E 90%)',
                                    '&:hover': {
                                        boxShadow: 6,
                                        background: 'linear-gradient(45deg, #E54B1B 30%, #FF6B35 90%)',
                                    }
                                }}
                                onClick={() => setOpen(true)}
                            >
                                <Badge badgeContent={unreadMessages} color="error">
                                    <SmartToyIcon sx={{ fontSize: 28 }} />
                                </Badge>
                            </Fab>
                        </Tooltip>
                    </motion.div>
                )}
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Box
                            sx={{
                                position: 'fixed',
                                bottom: 24,
                                right: 24,
                                width: { xs: '90vw', sm: 400 },
                                height: { xs: '80vh', sm: 600 },
                                backgroundColor: 'background.paper',
                                boxShadow: 6,
                                borderRadius: 3,
                                overflow: 'hidden',
                                zIndex: 9999,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Header */}
                            <Box sx={{ 
                                p: 2, 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                background: 'linear-gradient(45deg, #FF6B35 30%, #FF8B5E 90%)',
                                color: 'white',
                                flexShrink: 0 
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <SmartToyIcon sx={{ fontSize: 24 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>SportBot</Typography>
                                </Box>
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

                            {/* Messages area */}
                            <Box sx={{ 
                                flex: 1,
                                overflowY: 'auto',
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                backgroundColor: '#f8f9fa',
                                minHeight: 0,
                                '& > *': {
                                    flexShrink: 0
                                }
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
                                        <SmartToyIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                                        <Typography variant="h6" gutterBottom>
                                            Welcome to SportBot!
                                        </Typography>
                                        <Typography variant="body2" align="center" sx={{ maxWidth: 300 }}>
                                            I can help you find sports events, connect with coaches, and answer your questions about fitness and training.
                                        </Typography>
                                    </Box>
                                ) : (
                                    messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Box
                                                sx={{
                                                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                                                    maxWidth: '85%',
                                                }}
                                            >
                                                <Card
                                                    variant="outlined"
                                                    sx={{
                                                        backgroundColor: message.isUser ? 'primary.main' : 'white',
                                                        color: message.isUser ? 'primary.contrastText' : 'text.primary',
                                                        boxShadow: message.isUser ? 2 : 1,
                                                        borderRadius: 3,
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2 }}>
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
                                        </motion.div>
                                    ))
                                )}

                                {isTyping && (
                                    <Box sx={{ alignSelf: 'flex-start' }}>
                                        <Card variant="outlined" sx={{ backgroundColor: 'white' }}>
                                            <CardContent sx={{ p: 1.5 }}>
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    <CircularProgress size={12} />
                                                    <CircularProgress size={12} sx={{ animationDelay: '0.2s' }} />
                                                    <CircularProgress size={12} sx={{ animationDelay: '0.4s' }} />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )}

                                {events && events.length > 0 && (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ 
                                                mb: 1, 
                                                color: 'primary.main',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Recommended Events:
                                        </Typography>
                                        <Stack spacing={1}>
                                            {events.map((event) => (
                                                <motion.div
                                                    key={event.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Card
                                                        variant="outlined"
                                                        onClick={() => handleEventClick(event.id)}
                                                        sx={{ 
                                                            cursor: 'pointer', 
                                                            backgroundColor: 'white',
                                                            '&:hover': { 
                                                                backgroundColor: 'grey.50',
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
                                                </motion.div>
                                            ))}
                                        </Stack>
                                    </>
                                )}
                                <div ref={messagesEndRef} />
                            </Box>

                            {/* Input area */}
                            <Box
                                sx={{
                                    p: 2,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'flex-end',
                                    flexShrink: 0,
                                    backgroundColor: 'white'
                                }}
                            >
                                <IconButton 
                                    size="small"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <EmojiEmotionsIcon />
                                </IconButton>
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
                                            borderRadius: 3,
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
                                    disabled={loading || !input.trim()}
                                    sx={{
                                        minWidth: '40px',
                                        height: '40px',
                                        borderRadius: '20px',
                                        p: 0,
                                        boxShadow: 2,
                                        '&:hover': {
                                            boxShadow: 4,
                                        }
                                    }}
                                >
                                    {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                </Button>
                            </Box>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;
