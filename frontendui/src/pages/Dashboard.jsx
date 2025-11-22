import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { icon: '👤', label: 'Profile', value: 'Active', color: '#2563eb' },
    { icon: '🔐', label: 'Security', value: 'Verified', color: '#10b981' },
    { icon: '🌍', label: 'Language', value: user?.language?.toUpperCase() || 'EN', color: '#06b6d4' },
    { icon: '⚡', label: 'Status', value: 'Online', color: '#14b8a6' }
  ];

  const quickActions = [
    { icon: '👤', title: 'Update Profile', desc: 'Manage your account settings', color: '#2563eb' },
    { icon: '🔒', title: 'Security', desc: 'Change password & 2FA', color: '#10b981' },
    { icon: '🌐', title: 'Preferences', desc: 'Language & notifications', color: '#06b6d4' },
    { icon: '📊', title: 'Activity', desc: 'View your recent activity', color: '#8b5cf6' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(37, 99, 235, 0.1)' : 'rgba(16, 185, 129, 0.1)'} 0%, transparent 70%)`,
              borderRadius: '50%',
              top: `${20 + i * 30}%`,
              left: `${10 + i * 30}%`,
              animation: `float ${6 + i * 2}s ease-in-out infinite ${i % 2 === 0 ? '' : 'reverse'}`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="glass-card" style={{
        margin: '0',
        borderRadius: '0',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        padding: '1.5rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 className="gradient-text" style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: '0.25rem'
            }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Welcome back, {user?.name || 'User'}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Welcome Card */}
        <div className="glass-card animate-slide-down" style={{
          padding: '2.5rem',
          marginBottom: '2rem',
          background: 'var(--gradient-primary)',
          border: 'none'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              👋
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: 'white'
              }}>
                Hello, {user?.name}!
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card card-hover animate-slide-up"
              style={{
                padding: '1.5rem',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginBottom: '0.25rem'
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    color: stat.color,
                    fontSize: '1.3rem',
                    fontWeight: '700'
                  }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="glass-card animate-fade-in" style={{
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Quick Actions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="card-hover"
                style={{
                  padding: '1.5rem',
                  background: 'var(--glass-bg)',
                  border: `1px solid ${action.color}30`,
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.boxShadow = `0 0 20px ${action.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${action.color}30`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  {action.icon}
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: action.color
                }}>
                  {action.title}
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>
                  {action.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="glass-card animate-fade-in" style={{
          padding: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Account Information
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}>
                Full Name
              </p>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {user?.name}
              </p>
            </div>
            <div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}>
                Email Address
              </p>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {user?.email}
              </p>
            </div>
            <div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}>
                Language Preference
              </p>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {user?.language?.toUpperCase() || 'EN'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
