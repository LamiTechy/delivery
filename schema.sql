-- Delivery Tracking System - Neon PostgreSQL Schema
-- Run this in your Neon SQL Editor

-- Users table (admin)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
    id SERIAL PRIMARY KEY,
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INTEGER NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    sender_address TEXT NOT NULL,
    recipient_name VARCHAR(100) NOT NULL,
    recipient_address TEXT NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    package_description TEXT NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    current_location VARCHAR(200),
    delivery_fee DECIMAL(10,2) NOT NULL,
    estimated_delivery DATE,
    actual_delivery TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Tracking history table
CREATE TABLE IF NOT EXISTS tracking_history (
    id SERIAL PRIMARY KEY,
    delivery_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_id) REFERENCES deliveries(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracking_number ON deliveries(tracking_number);
CREATE INDEX IF NOT EXISTS idx_delivery_status ON deliveries(status);
CREATE INDEX IF NOT EXISTS idx_customer_id ON deliveries(customer_id);
CREATE INDEX IF NOT EXISTS idx_tracking_delivery_id ON tracking_history(delivery_id);

-- Insert default admin user (password: admin123)
-- Password hash generated with bcrypt
INSERT INTO users (username, password, email, full_name, role) 
VALUES ('admin', '$2a$10$HACWKMLOQSl1fC8Vkp00buCQTxtcbHJl5SssfkOCHwwdL1RFg7b..', 'admin@delivery.com', 'System Administrator', 'admin');

-- Sample customers
INSERT INTO customers (name, email, phone, address) VALUES
('John Doe', 'john.doe@email.com', '+1-234-567-8900', '123 Main Street, New York, NY 10001'),
('Jane Smith', 'jane.smith@email.com', '+1-234-567-8901', '456 Oak Avenue, Los Angeles, CA 90001'),
('Robert Johnson', 'robert.j@email.com', '+1-234-567-8902', '789 Pine Road, Chicago, IL 60601');

-- Sample deliveries
INSERT INTO deliveries (tracking_number, customer_id, sender_name, sender_address, recipient_name, recipient_address, recipient_phone, package_description, weight, status, current_location, delivery_fee, estimated_delivery) VALUES
('TRK1000001', 1, 'Amazon Warehouse', '100 Warehouse Blvd, Seattle, WA', 'John Doe', '123 Main Street, New York, NY 10001', '+1-234-567-8900', 'Electronics - Laptop', 2.50, 'in_transit', 'Distribution Center - Newark, NJ', 25.00, CURRENT_DATE + INTERVAL '2 days'),
('TRK1000002', 2, 'Fashion Store', '200 Fashion Ave, New York, NY', 'Jane Smith', '456 Oak Avenue, Los Angeles, CA 90001', '+1-234-567-8901', 'Clothing Package', 1.20, 'out_for_delivery', 'Local Hub - Los Angeles, CA', 15.00, CURRENT_DATE),
('TRK1000003', 3, 'Books Express', '300 Library St, Boston, MA', 'Robert Johnson', '789 Pine Road, Chicago, IL 60601', '+1-234-567-8902', 'Books Collection', 3.00, 'delivered', 'Delivered', 20.00, CURRENT_DATE - INTERVAL '1 day'),
('TRK1000004', 1, 'Tech Hub', '400 Silicon Valley, CA', 'John Doe', '123 Main Street, New York, NY 10001', '+1-234-567-8900', 'Smart Watch', 0.50, 'pending', 'Warehouse - California', 12.00, CURRENT_DATE + INTERVAL '5 days');

-- Sample tracking history
INSERT INTO tracking_history (delivery_id, status, location, description) VALUES
(1, 'pending', 'Amazon Warehouse - Seattle, WA', 'Package received at warehouse'),
(1, 'in_transit', 'Transit Hub - Denver, CO', 'Package in transit'),
(1, 'in_transit', 'Distribution Center - Newark, NJ', 'Arrived at distribution center'),
(2, 'pending', 'Fashion Store - New York, NY', 'Package picked up'),
(2, 'in_transit', 'Transit Hub - Las Vegas, NV', 'In transit to destination'),
(2, 'out_for_delivery', 'Local Hub - Los Angeles, CA', 'Out for delivery'),
(3, 'pending', 'Books Express - Boston, MA', 'Order confirmed'),
(3, 'in_transit', 'Transit Hub - Cleveland, OH', 'In transit'),
(3, 'out_for_delivery', 'Local Hub - Chicago, IL', 'Out for delivery'),
(3, 'delivered', 'Delivered', 'Package delivered successfully'),
(4, 'pending', 'Tech Hub - California', 'Package awaiting pickup');
