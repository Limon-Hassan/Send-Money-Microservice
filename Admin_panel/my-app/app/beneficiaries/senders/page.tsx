"use client";
import { useState } from "react";
import { flagForCountryName } from "@/lib/countries_data";

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "Completed" | "Pending" | "Failed" | "Refunded";
type TxMethod =
    | "Bank Transfer"
    | "Visa Card"
    | "Mastercard"
    | "Cash Pickup"
    | "Mobile Wallet"
    | "bKash"
    | "Nagad";

interface Transaction {
    id: string;
    sender: {
        name: string;
        email: string;
        avatar: string;
        country: string;
        phone: string;
    };
    receiver: {
        name: string;
        country: string;
        phone: string;
        avatar: string;
    };
    amount: string;
    amountLocal: string;
    fee: string;
    exchangeRate: string;
    totalDebit: string;
    method: TxMethod;
    status: TxStatus;
    purpose: string;
    date: string;
    time: string;
    timeAgo: string;
    timeline: { label: string; time: string; done: boolean }[];
}

// ─── Fake Data (25 records) ───────────────────────────────────────────────────

const transactionsData: Transaction[] = [
    {
        id: "TXN-2505124789", sender: { name: "John Doe", email: "john.doe@example.com", avatar: "JD", country: "United Kingdom", phone: "+44 7700 900123" },
        receiver: { name: "Rahim Uddin", country: "Bangladesh", phone: "+880 1712 345678", avatar: "RU" },
        amount: "£500.00", amountLocal: "৳72,500.00", fee: "£3.50", exchangeRate: "1 GBP = ৳145.00", totalDebit: "£503.50",
        method: "Visa Card", status: "Completed", purpose: "Family Support",
        date: "May 12, 2025", time: "2:32 PM", timeAgo: "2 min ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 2:31 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 2:32 PM", done: true },
            { label: "Transfer Initiated", time: "May 12, 2025 2:32 PM", done: true },
            { label: "Delivered to Receiver", time: "May 12, 2025 2:34 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124788", sender: { name: "Ahmed Khan", email: "ahmed.khan@example.com", avatar: "AK", country: "United Kingdom", phone: "+44 7700 900125" },
        receiver: { name: "Maria Santos", country: "Philippines", phone: "+63 917 123 4567", avatar: "MS" },
        amount: "£300.00", amountLocal: "₱16,800.00", fee: "£2.50", exchangeRate: "1 GBP = ₱56.00", totalDebit: "£302.50",
        method: "Bank Transfer", status: "Pending", purpose: "Education",
        date: "May 12, 2025", time: "2:22 PM", timeAgo: "10 min ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 2:20 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 2:22 PM", done: true },
            { label: "Transfer Initiated", time: "May 12, 2025 2:22 PM", done: false },
        ],
    },
    {
        id: "TXN-2505124787", sender: { name: "Rashid Ahmed", email: "rashid.ahmed@example.com", avatar: "RA", country: "United Kingdom", phone: "+44 7700 900131" },
        receiver: { name: "Sabbir Hossain", country: "Bangladesh", phone: "+880 1911 234567", avatar: "SH" },
        amount: "£750.00", amountLocal: "৳91,500.00", fee: "£4.00", exchangeRate: "1 GBP = ৳122.00", totalDebit: "£754.00",
        method: "Cash Pickup", status: "Completed", purpose: "Medical Expenses",
        date: "May 12, 2025", time: "2:12 PM", timeAgo: "20 min ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 2:10 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 2:12 PM", done: true },
            { label: "Cash Ready for Pickup", time: "May 12, 2025 2:14 PM", done: true },
            { label: "Collected by Receiver", time: "May 12, 2025 2:50 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124786", sender: { name: "Sarina Begum", email: "sarina.begum@example.com", avatar: "SB", country: "United Kingdom", phone: "+44 7700 900132" },
        receiver: { name: "Mohammad Ali", country: "India", phone: "+91 98765 43210", avatar: "MA" },
        amount: "£1,000.00", amountLocal: "₹83,200.00", fee: "£5.00", exchangeRate: "1 GBP = ₹83.20", totalDebit: "£1,005.00",
        method: "Mobile Wallet", status: "Pending", purpose: "Business Payment",
        date: "May 12, 2025", time: "2:07 PM", timeAgo: "25 min ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 2:05 PM", done: true },
            { label: "Awaiting Payment Confirmation", time: "May 12, 2025 2:07 PM", done: false },
        ],
    },
    {
        id: "TXN-2505124785", sender: { name: "Imran Hossain", email: "imran.hossain@example.com", avatar: "IH", country: "United Kingdom", phone: "+44 7700 900133" },
        receiver: { name: "Arif Khan", country: "Bangladesh", phone: "+880 1815 678901", avatar: "AK" },
        amount: "£200.00", amountLocal: "৳16,200.00", fee: "£2.00", exchangeRate: "1 GBP = ৳81.00", totalDebit: "£202.00",
        method: "Bank Transfer", status: "Failed", purpose: "Family Support",
        date: "May 12, 2025", time: "2:02 PM", timeAgo: "30 min ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 2:00 PM", done: true },
            { label: "Payment Attempted", time: "May 12, 2025 2:02 PM", done: true },
            { label: "Transfer Failed — Bank Rejected", time: "May 12, 2025 2:03 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124784", sender: { name: "Fatima Ali", email: "fatima.ali@example.com", avatar: "FA", country: "United Kingdom", phone: "+44 7700 900128" },
        receiver: { name: "Nusrat Jahan", country: "Bangladesh", phone: "+880 1712 000001", avatar: "NJ" },
        amount: "£150.00", amountLocal: "৳21,750.00", fee: "£1.50", exchangeRate: "1 GBP = ৳145.00", totalDebit: "£151.50",
        method: "bKash", status: "Completed", purpose: "Living Expenses",
        date: "May 12, 2025", time: "1:47 PM", timeAgo: "45 min ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 1:45 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 1:46 PM", done: true },
            { label: "Sent to bKash Wallet", time: "May 12, 2025 1:47 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124783", sender: { name: "David Wilson", email: "david.wilson@example.com", avatar: "DW", country: "United Kingdom", phone: "+44 7700 900129" },
        receiver: { name: "Sujon Das", country: "Bangladesh", phone: "+880 1900 223344", avatar: "SD" },
        amount: "£250.00", amountLocal: "৳36,500.00", fee: "£2.50", exchangeRate: "1 GBP = ৳146.00", totalDebit: "£252.50",
        method: "Bank Transfer", status: "Refunded", purpose: "Personal Transfer",
        date: "May 12, 2025", time: "1:32 PM", timeAgo: "1 hour ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 1:30 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 1:32 PM", done: true },
            { label: "Transfer Initiated", time: "May 12, 2025 1:33 PM", done: true },
            { label: "Refund Requested", time: "May 12, 2025 1:45 PM", done: true },
            { label: "Refund Processed", time: "May 12, 2025 2:00 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124782", sender: { name: "Sophie Martin", email: "sophie.martin@example.com", avatar: "SM", country: "United Kingdom", phone: "+44 7700 900130" },
        receiver: { name: "Tanvir Hasan", country: "Bangladesh", phone: "+880 1611 445566", avatar: "TH" },
        amount: "£400.00", amountLocal: "৳58,400.00", fee: "£3.00", exchangeRate: "1 GBP = ৳146.00", totalDebit: "£403.00",
        method: "Nagad", status: "Completed", purpose: "Family Support",
        date: "May 12, 2025", time: "1:32 PM", timeAgo: "1 hour ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 1:30 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 1:31 PM", done: true },
            { label: "Sent to Nagad Wallet", time: "May 12, 2025 1:32 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124781", sender: { name: "James Okafor", email: "james.okafor@example.com", avatar: "JO", country: "United Kingdom", phone: "+44 7700 900127" },
        receiver: { name: "Ibrahim Khalil", country: "United Arab Emirates", phone: "+971 50 123 4567", avatar: "IK" },
        amount: "AED 1,200.00", amountLocal: "AED 1,200.00", fee: "£4.00", exchangeRate: "1 GBP = AED 4.80", totalDebit: "£254.00",
        method: "Bank Transfer", status: "Completed", purpose: "Rent Payment",
        date: "May 12, 2025", time: "1:32 PM", timeAgo: "1 hour ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 1:30 PM", done: true },
            { label: "Payment Confirmed", time: "May 12, 2025 1:31 PM", done: true },
            { label: "Wire Sent", time: "May 12, 2025 1:32 PM", done: true },
            { label: "Received by Beneficiary Bank", time: "May 12, 2025 1:50 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124780", sender: { name: "Priya Sharma", email: "priya.sharma@example.com", avatar: "PS", country: "United Kingdom", phone: "+44 7700 900124" },
        receiver: { name: "Shakil Ahmed", country: "Bangladesh", phone: "+880 1988 667788", avatar: "SA" },
        amount: "$600.00", amountLocal: "৳54,600.00", fee: "£3.50", exchangeRate: "1 USD = ৳91.00", totalDebit: "$603.50",
        method: "Bank Transfer", status: "Pending", purpose: "Education",
        date: "May 12, 2025", time: "12:32 PM", timeAgo: "2 hours ago",
        timeline: [
            { label: "Transaction Created", time: "May 12, 2025 12:30 PM", done: true },
            { label: "Awaiting Bank Confirmation", time: "May 12, 2025 12:32 PM", done: false },
        ],
    },
    {
        id: "TXN-2505124779", sender: { name: "Maria Santos", email: "maria.santos@example.com", avatar: "MS", country: "United Kingdom", phone: "+44 7700 900126" },
        receiver: { name: "Elena Santos", country: "Philippines", phone: "+63 920 000 1111", avatar: "ES" },
        amount: "£950.00", amountLocal: "₱53,200.00", fee: "£4.50", exchangeRate: "1 GBP = ₱56.00", totalDebit: "£954.50",
        method: "Bank Transfer", status: "Completed", purpose: "Family Support",
        date: "May 11, 2025", time: "5:10 PM", timeAgo: "Yesterday",
        timeline: [
            { label: "Transaction Created", time: "May 11, 2025 5:08 PM", done: true },
            { label: "Payment Confirmed", time: "May 11, 2025 5:10 PM", done: true },
            { label: "Transfer Initiated", time: "May 11, 2025 5:11 PM", done: true },
            { label: "Delivered to Receiver", time: "May 11, 2025 5:45 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124778", sender: { name: "Ahmed Khan", email: "ahmed.khan@example.com", avatar: "AK", country: "United Kingdom", phone: "+44 7700 900125" },
        receiver: { name: "Imran Ahmed", country: "Pakistan", phone: "+92 321 123 4567", avatar: "IA" },
        amount: "£1,200.00", amountLocal: "₨420,000.00", fee: "£5.00", exchangeRate: "1 GBP = ₨350.00", totalDebit: "£1,205.00",
        method: "Bank Transfer", status: "Completed", purpose: "Business Payment",
        date: "May 11, 2025", time: "3:22 PM", timeAgo: "Yesterday",
        timeline: [
            { label: "Transaction Created", time: "May 11, 2025 3:20 PM", done: true },
            { label: "Payment Confirmed", time: "May 11, 2025 3:22 PM", done: true },
            { label: "Transfer Initiated", time: "May 11, 2025 3:23 PM", done: true },
            { label: "Delivered to Receiver", time: "May 11, 2025 4:10 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124777", sender: { name: "John Doe", email: "john.doe@example.com", avatar: "JD", country: "United Kingdom", phone: "+44 7700 900123" },
        receiver: { name: "Karim Uddin", country: "Bangladesh", phone: "+880 1755 111222", avatar: "KU" },
        amount: "£320.00", amountLocal: "৳46,400.00", fee: "£2.50", exchangeRate: "1 GBP = ৳145.00", totalDebit: "£322.50",
        method: "bKash", status: "Completed", purpose: "Living Expenses",
        date: "May 11, 2025", time: "11:05 AM", timeAgo: "Yesterday",
        timeline: [
            { label: "Transaction Created", time: "May 11, 2025 11:03 AM", done: true },
            { label: "Payment Confirmed", time: "May 11, 2025 11:05 AM", done: true },
            { label: "Sent to bKash Wallet", time: "May 11, 2025 11:06 AM", done: true },
        ],
    },
    {
        id: "TXN-2505124776", sender: { name: "Fatima Ali", email: "fatima.ali@example.com", avatar: "FA", country: "United Kingdom", phone: "+44 7700 900128" },
        receiver: { name: "Yusuf Ali", country: "Bangladesh", phone: "+880 1888 333444", avatar: "YA" },
        amount: "£680.00", amountLocal: "৳98,600.00", fee: "£3.50", exchangeRate: "1 GBP = ৳145.00", totalDebit: "£683.50",
        method: "Nagad", status: "Failed", purpose: "Family Support",
        date: "May 10, 2025", time: "8:55 PM", timeAgo: "2 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 10, 2025 8:53 PM", done: true },
            { label: "Payment Confirmed", time: "May 10, 2025 8:55 PM", done: true },
            { label: "Transfer Failed — Wallet Limit Exceeded", time: "May 10, 2025 8:56 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124775", sender: { name: "David Wilson", email: "david.wilson@example.com", avatar: "DW", country: "United Kingdom", phone: "+44 7700 900129" },
        receiver: { name: "Ngozi Eze", country: "Nigeria", phone: "+234 803 123 4567", avatar: "NE" },
        amount: "£1,500.00", amountLocal: "₦2,250,000.00", fee: "£5.50", exchangeRate: "1 GBP = ₦1,500.00", totalDebit: "£1,505.50",
        method: "Bank Transfer", status: "Completed", purpose: "Business Payment",
        date: "May 10, 2025", time: "4:18 PM", timeAgo: "2 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 10, 2025 4:16 PM", done: true },
            { label: "Payment Confirmed", time: "May 10, 2025 4:18 PM", done: true },
            { label: "Wire Sent", time: "May 10, 2025 4:20 PM", done: true },
            { label: "Received by Beneficiary Bank", time: "May 10, 2025 5:30 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124774", sender: { name: "Sophie Martin", email: "sophie.martin@example.com", avatar: "SM", country: "United Kingdom", phone: "+44 7700 900130" },
        receiver: { name: "Claire Martin", country: "France", phone: "+33 6 12 34 56 78", avatar: "CM" },
        amount: "€780.00", amountLocal: "€780.00", fee: "£3.50", exchangeRate: "1 GBP = €1.17", totalDebit: "£670.50",
        method: "Bank Transfer", status: "Completed", purpose: "Family Support",
        date: "May 10, 2025", time: "1:44 PM", timeAgo: "2 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 10, 2025 1:42 PM", done: true },
            { label: "Payment Confirmed", time: "May 10, 2025 1:44 PM", done: true },
            { label: "SEPA Transfer Initiated", time: "May 10, 2025 1:45 PM", done: true },
            { label: "Delivered to Receiver", time: "May 10, 2025 2:10 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124773", sender: { name: "Rashid Ahmed", email: "rashid.ahmed@example.com", avatar: "RA", country: "United Kingdom", phone: "+44 7700 900131" },
        receiver: { name: "Farah Khan", country: "Pakistan", phone: "+92 300 987 6543", avatar: "FK" },
        amount: "£880.00", amountLocal: "₨308,000.00", fee: "£4.00", exchangeRate: "1 GBP = ₨350.00", totalDebit: "£884.00",
        method: "Mastercard", status: "Pending", purpose: "Living Expenses",
        date: "May 10, 2025", time: "10:30 AM", timeAgo: "2 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 10, 2025 10:28 AM", done: true },
            { label: "Payment Processing", time: "May 10, 2025 10:30 AM", done: false },
        ],
    },
    {
        id: "TXN-2505124772", sender: { name: "Priya Sharma", email: "priya.sharma@example.com", avatar: "PS", country: "United Kingdom", phone: "+44 7700 900124" },
        receiver: { name: "Raj Sharma", country: "India", phone: "+91 98001 23456", avatar: "RS" },
        amount: "£420.00", amountLocal: "₹34,944.00", fee: "£3.00", exchangeRate: "1 GBP = ₹83.20", totalDebit: "£423.00",
        method: "Visa Card", status: "Completed", purpose: "Education",
        date: "May 9, 2025", time: "7:15 PM", timeAgo: "3 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 9, 2025 7:13 PM", done: true },
            { label: "Card Payment Confirmed", time: "May 9, 2025 7:15 PM", done: true },
            { label: "Transfer Initiated", time: "May 9, 2025 7:15 PM", done: true },
            { label: "Delivered to Receiver", time: "May 9, 2025 7:22 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124771", sender: { name: "James Okafor", email: "james.okafor@example.com", avatar: "JO", country: "United Kingdom", phone: "+44 7700 900127" },
        receiver: { name: "Chinedu Okafor", country: "Nigeria", phone: "+234 812 345 6789", avatar: "CO" },
        amount: "£600.00", amountLocal: "₦900,000.00", fee: "£4.50", exchangeRate: "1 GBP = ₦1,500.00", totalDebit: "£604.50",
        method: "Bank Transfer", status: "Refunded", purpose: "Personal Transfer",
        date: "May 9, 2025", time: "3:40 PM", timeAgo: "3 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 9, 2025 3:38 PM", done: true },
            { label: "Payment Confirmed", time: "May 9, 2025 3:40 PM", done: true },
            { label: "Transfer Failed — Compliance Hold", time: "May 9, 2025 3:42 PM", done: true },
            { label: "Refund Initiated", time: "May 9, 2025 4:00 PM", done: true },
            { label: "Refund Completed", time: "May 9, 2025 4:30 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124770", sender: { name: "Sarina Begum", email: "sarina.begum@example.com", avatar: "SB", country: "United Kingdom", phone: "+44 7700 900132" },
        receiver: { name: "Arjun Mehta", country: "India", phone: "+91 99001 11223", avatar: "AM" },
        amount: "£550.00", amountLocal: "₹45,760.00", fee: "£3.50", exchangeRate: "1 GBP = ₹83.20", totalDebit: "£553.50",
        method: "Mobile Wallet", status: "Completed", purpose: "Rent Payment",
        date: "May 9, 2025", time: "11:00 AM", timeAgo: "3 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 9, 2025 10:58 AM", done: true },
            { label: "Payment Confirmed", time: "May 9, 2025 11:00 AM", done: true },
            { label: "Sent to Mobile Wallet", time: "May 9, 2025 11:01 AM", done: true },
        ],
    },
    {
        id: "TXN-2505124769", sender: { name: "John Doe", email: "john.doe@example.com", avatar: "JD", country: "United Kingdom", phone: "+44 7700 900123" },
        receiver: { name: "Sara Rahman", country: "Bangladesh", phone: "+880 1755 999888", avatar: "SR" },
        amount: "£180.00", amountLocal: "৳26,100.00", fee: "£1.50", exchangeRate: "1 GBP = ৳145.00", totalDebit: "£181.50",
        method: "bKash", status: "Completed", purpose: "Family Support",
        date: "May 8, 2025", time: "6:20 PM", timeAgo: "4 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 8, 2025 6:18 PM", done: true },
            { label: "Payment Confirmed", time: "May 8, 2025 6:19 PM", done: true },
            { label: "Sent to bKash Wallet", time: "May 8, 2025 6:20 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124768", sender: { name: "Maria Santos", email: "maria.santos@example.com", avatar: "MS", country: "United Kingdom", phone: "+44 7700 900126" },
        receiver: { name: "Carlos Santos", country: "Philippines", phone: "+63 915 888 7777", avatar: "CS" },
        amount: "£620.00", amountLocal: "₱34,720.00", fee: "£3.50", exchangeRate: "1 GBP = ₱56.00", totalDebit: "£623.50",
        method: "Bank Transfer", status: "Failed", purpose: "Education",
        date: "May 8, 2025", time: "2:05 PM", timeAgo: "4 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 8, 2025 2:03 PM", done: true },
            { label: "Payment Confirmed", time: "May 8, 2025 2:05 PM", done: true },
            { label: "Transfer Failed — Invalid Account", time: "May 8, 2025 2:06 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124767", sender: { name: "Imran Hossain", email: "imran.hossain@example.com", avatar: "IH", country: "United Kingdom", phone: "+44 7700 900133" },
        receiver: { name: "Tariq Mahmood", country: "Bangladesh", phone: "+880 1700 445566", avatar: "TM" },
        amount: "£430.00", amountLocal: "৳62,350.00", fee: "£3.00", exchangeRate: "1 GBP = ৳145.00", totalDebit: "£433.00",
        method: "Nagad", status: "Completed", purpose: "Living Expenses",
        date: "May 7, 2025", time: "9:50 AM", timeAgo: "5 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 7, 2025 9:48 AM", done: true },
            { label: "Payment Confirmed", time: "May 7, 2025 9:49 AM", done: true },
            { label: "Sent to Nagad Wallet", time: "May 7, 2025 9:50 AM", done: true },
        ],
    },
    {
        id: "TXN-2505124766", sender: { name: "David Wilson", email: "david.wilson@example.com", avatar: "DW", country: "United Kingdom", phone: "+44 7700 900129" },
        receiver: { name: "Hans Mueller", country: "Germany", phone: "+49 170 123 4567", avatar: "HM" },
        amount: "€2,100.00", amountLocal: "€2,100.00", fee: "£6.00", exchangeRate: "1 GBP = €1.17", totalDebit: "£1,800.00",
        method: "Bank Transfer", status: "Completed", purpose: "Business Payment",
        date: "May 7, 2025", time: "4:33 PM", timeAgo: "5 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 7, 2025 4:31 PM", done: true },
            { label: "Payment Confirmed", time: "May 7, 2025 4:33 PM", done: true },
            { label: "SEPA Wire Sent", time: "May 7, 2025 4:34 PM", done: true },
            { label: "Received by Beneficiary Bank", time: "May 7, 2025 5:00 PM", done: true },
        ],
    },
    {
        id: "TXN-2505124765", sender: { name: "Priya Sharma", email: "priya.sharma@example.com", avatar: "PS", country: "United Kingdom", phone: "+44 7700 900124" },
        receiver: { name: "Vikram Patel", country: "India", phone: "+91 97777 22233", avatar: "VP" },
        amount: "£900.00", amountLocal: "₹74,880.00", fee: "£4.00", exchangeRate: "1 GBP = ₹83.20", totalDebit: "£904.00",
        method: "Mastercard", status: "Pending", purpose: "Investment",
        date: "May 7, 2025", time: "12:10 PM", timeAgo: "5 days ago",
        timeline: [
            { label: "Transaction Created", time: "May 7, 2025 12:08 PM", done: true },
            { label: "Card Payment Pending", time: "May 7, 2025 12:10 PM", done: false },
        ],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avatarColors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
    "bg-pink-500", "bg-teal-500", "bg-indigo-500", "bg-rose-500",
    "bg-cyan-500", "bg-amber-500",
];
const avatarBg = (s: string) =>
    avatarColors[(s.charCodeAt(0) + (s.charCodeAt(1) || 0)) % avatarColors.length];

// country name map for flagForCountryName
const countryFlagMap: Record<string, string> = {
    "United Kingdom": "United Kingdom",
    "Bangladesh": "Bangladesh",
    "India": "India",
    "Pakistan": "Pakistan",
    "Philippines": "Philippines",
    "Nigeria": "Nigeria",
    "France": "France",
    "Germany": "Germany",
    "United Arab Emirates": "United Arab Emirates",
};

const FlagImg = ({ country, size = "w-5 h-5" }: { country: string; size?: string }) => {
    const mapped = countryFlagMap[country];
    if (mapped) {
        return (
            <img
                src={flagForCountryName(mapped)}
                alt={country}
                className={`${size} rounded-full object-cover inline-block shrink-0`}
            />
        );
    }
    return <span className={`${size} inline-flex items-center justify-center text-sm`}>🌍</span>;
};

const statusStyle: Record<TxStatus, string> = {
    Completed: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800",
    Pending: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
    Failed: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800",
    Refunded: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
};

const statusDot: Record<TxStatus, string> = {
    Completed: "bg-green-500",
    Pending: "bg-yellow-400",
    Failed: "bg-red-500",
    Refunded: "bg-purple-500",
};

const methodIcon = (m: TxMethod) => {
    if (m === "Visa Card") return <span className="inline-flex items-center text-blue-700 dark:text-blue-400 font-bold text-[10px] bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded px-1.5 py-0.5">VISA</span>;
    if (m === "Mastercard") return <span className="inline-flex items-center text-red-600 dark:text-red-400 font-bold text-[10px] bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded px-1.5 py-0.5">MC</span>;
    if (m === "Cash Pickup") return <svg className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    if (m === "Mobile Wallet") return <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8.5 21h7a2 2 0 002-2V5a2 2 0 00-2-2h-7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    if (m === "bKash") return <span className="inline-flex items-center text-pink-600 dark:text-pink-400 font-bold text-[10px] bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-700 rounded px-1.5 py-0.5">bK</span>;
    if (m === "Nagad") return <span className="inline-flex items-center text-orange-600 dark:text-orange-400 font-bold text-[10px] bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded px-1.5 py-0.5">Ng</span>;
    return <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
};

const allStatuses: TxStatus[] = ["Completed", "Pending", "Failed", "Refunded"];
const allCountries = ["Bangladesh", "India", "Pakistan", "Philippines", "Nigeria", "France", "Germany", "United Arab Emirates"];
const allMethods: TxMethod[] = ["Bank Transfer", "Visa Card", "Mastercard", "Cash Pickup", "Mobile Wallet", "bKash", "Nagad"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TransactionListPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All Status");
    const [filterCountry, setFilterCountry] = useState("All Countries");
    const [filterMethod, setFilterMethod] = useState("All Methods");
    const [checkedIds, setCheckedIds] = useState<string[]>([]);

    const selectedTx = transactionsData.find(t => t.id === selectedId) ?? null;

    const filtered = transactionsData.filter(t => {
        const q = search.toLowerCase();
        return (
            (!q || t.id.toLowerCase().includes(q) || t.sender.name.toLowerCase().includes(q) || t.receiver.name.toLowerCase().includes(q)) &&
            (filterStatus === "All Status" || t.status === filterStatus) &&
            (filterCountry === "All Countries" || t.receiver.country === filterCountry) &&
            (filterMethod === "All Methods" || t.method === filterMethod)
        );
    });

    const toggleCheck = (id: string) =>
        setCheckedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const toggleAll = () =>
        setCheckedIds(checkedIds.length === filtered.length ? [] : filtered.map(t => t.id));

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Senders List</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard &gt; Senders</p>
            </div>

            <div className="flex gap-0">
                {/* ── Table panel ── */}
                <div className={`flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-0 transition-all ${selectedTx ? "rounded-r-none border-r-0" : ""}`}>

                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search by ID, Sender, Receiver..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="flex gap-2 flex-wrap shrink-0">
                            {([["filterStatus", filterStatus, setFilterStatus, ["All Status", ...allStatuses]],
                            ["filterCountry", filterCountry, setFilterCountry, ["All Countries", ...allCountries]],
                            ["filterMethod", filterMethod, setFilterMethod, ["All Methods", ...allMethods]]] as const).map(([, val, setter, opts]) => (
                                <select key={String(opts[0])} value={val} onChange={e => (setter as (v: string) => void)(e.target.value)}
                                    className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500">
                                    {(opts as unknown as string[]).map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                        </div>
                    </div>

                    {/* ── Desktop table ── */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                                    <th className="pl-4 py-3 w-8">
                                        <input type="checkbox" checked={checkedIds.length === filtered.length && filtered.length > 0} onChange={toggleAll}
                                            className="rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-1 focus:ring-green-500" />
                                    </th>
                                    <th className="text-left py-3 pr-3 font-semibold">Transaction ID</th>
                                    <th className="text-left py-3 pr-3 font-semibold">Sender</th>
                                    <th className="text-left py-3 pr-3 font-semibold">Receiver</th>
                                    <th className="text-left py-3 pr-3 font-semibold">Amount</th>
                                    <th className="text-left py-3 pr-3 font-semibold">Method</th>
                                    <th className="text-left py-3 pr-3 font-semibold">Status</th>
                                    <th className="text-left py-3 pr-3 font-semibold">Date &amp; Time</th>
                                    <th className="py-3 pr-3 w-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                                {filtered.map(tx => (
                                    <tr key={tx.id} onClick={() => setSelectedId(tx.id === selectedId ? null : tx.id)}
                                        className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedId === tx.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}>
                                        <td className="pl-4 py-3" onClick={e => { e.stopPropagation(); toggleCheck(tx.id); }}>
                                            <input type="checkbox" checked={checkedIds.includes(tx.id)} onChange={() => toggleCheck(tx.id)}
                                                className="rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-1 focus:ring-green-500" />
                                        </td>
                                        <td className="py-3 pr-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">{tx.id}</span>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${avatarBg(tx.sender.avatar)}`}>{tx.sender.avatar}</div>
                                                <div>
                                                    <div className="font-semibold text-gray-800 dark:text-white">{tx.sender.name}</div>
                                                    <div className="text-gray-400">{tx.sender.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <div className="flex items-center gap-1.5">
                                                <FlagImg country={tx.receiver.country} />
                                                <div>
                                                    <div className="font-semibold text-gray-800 dark:text-white">{tx.receiver.name}</div>
                                                    <div className="text-gray-400">{tx.receiver.country}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <div className="font-semibold text-gray-800 dark:text-white">{tx.amount}</div>
                                            <div className="text-gray-400">{tx.amountLocal}</div>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <div className="flex items-center gap-1.5">
                                                {methodIcon(tx.method)}
                                                <span className="text-gray-600 dark:text-gray-300">{tx.method}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${statusStyle[tx.status]}`}>
                                                ● {tx.status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <div className="text-gray-700 dark:text-gray-200">{tx.date}</div>
                                            <div className="text-gray-400">{tx.timeAgo}</div>
                                        </td>
                                        <td className="py-3 pr-3">
                                            <button onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Mobile card list ── */}
                    <div className="md:hidden divide-y divide-gray-50 dark:divide-gray-800/60">
                        {filtered.map(tx => (
                            <div key={tx.id} onClick={() => setSelectedId(tx.id === selectedId ? null : tx.id)}
                                className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedId === tx.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}>
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarBg(tx.sender.avatar)}`}>{tx.sender.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{tx.id}</span>
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${statusStyle[tx.status]}`}>● {tx.status}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-800 dark:text-white mt-0.5">{tx.sender.name} → {tx.receiver.name}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                        <FlagImg country={tx.receiver.country} size="w-3.5 h-3.5" /> {tx.receiver.country}
                                    </div>
                                    <div className="flex items-center justify-between mt-1.5">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                            {methodIcon(tx.method)} {tx.method}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">{tx.amount}</div>
                                            <div className="text-[10px] text-gray-400">{tx.timeAgo}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Showing 1–{filtered.length} of 2,475 transactions</span>
                        <div className="flex items-center gap-1 text-xs">
                            <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">‹</button>
                            {[1, 2].map(n => (
                                <button key={n} className={`w-7 h-7 rounded text-xs ${n === 1 ? "bg-green-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>{n}</button>
                            ))}
                            <span className="text-gray-400 px-1">…</span>
                            <button className="w-7 h-7 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">248</button>
                            <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">›</button>
                            <select className="ml-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 focus:outline-none">
                                <option>10 / page</option><option>25 / page</option><option>50 / page</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Detail Sidebar ── */}
                {selectedTx && (
                    <div className="fixed inset-0 z-40 md:static md:inset-auto md:z-auto md:w-72 xl:w-80 shrink-0 flex flex-col">
                        {/* Mobile backdrop */}
                        <div className="absolute inset-0 bg-black/40 md:hidden" onClick={() => setSelectedId(null)} />
                        <div className="relative ml-auto w-80 md:w-full h-full bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 md:rounded-r-xl flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
                                <span className="text-sm font-bold text-gray-800 dark:text-white">Transaction Details</span>
                                <button onClick={() => setSelectedId(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                                {/* Status + ID */}
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${statusDot[selectedTx.status]}`}></span>
                                        <span className={`text-xs font-semibold ${selectedTx.status === "Completed" ? "text-green-600 dark:text-green-400" : selectedTx.status === "Pending" ? "text-yellow-600 dark:text-yellow-400" : selectedTx.status === "Failed" ? "text-red-600 dark:text-red-400" : "text-purple-600 dark:text-purple-400"}`}>
                                            {selectedTx.status}
                                        </span>
                                    </div>
                                    <div className="text-base font-bold text-gray-900 dark:text-white">{selectedTx.id}</div>
                                    <div className="text-xs text-gray-400">{selectedTx.date} {selectedTx.time}</div>
                                </div>

                                {/* Overview */}
                                <div>
                                    <h4 className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Transaction Overview</h4>
                                    <div className="space-y-2">
                                        {[
                                            { label: "Amount", value: selectedTx.amount, sub: selectedTx.amountLocal },
                                            { label: "Fee", value: selectedTx.fee },
                                            { label: "Exchange Rate", value: selectedTx.exchangeRate },
                                            { label: "Total Debit", value: selectedTx.totalDebit },
                                            { label: "Payment Method", value: selectedTx.method },
                                            { label: "Purpose", value: selectedTx.purpose },
                                        ].map(row => (
                                            <div key={row.label} className="flex items-start justify-between gap-2">
                                                <span className="text-xs text-gray-400 shrink-0">{row.label}</span>
                                                <div className="text-right">
                                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{row.value}</span>
                                                    {row.sub && <div className="text-[10px] text-gray-400">{row.sub}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sender */}
                                <div>
                                    <h4 className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Sender Information</h4>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarBg(selectedTx.sender.avatar)}`}>{selectedTx.sender.avatar}</div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-gray-800 dark:text-white truncate">{selectedTx.sender.name}</div>
                                            <div className="text-[11px] text-gray-400 truncate">{selectedTx.sender.email}</div>
                                            <div className="text-[11px] text-gray-400">{selectedTx.sender.phone}</div>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <FlagImg country={selectedTx.sender.country} size="w-3.5 h-3.5" />
                                                <span className="text-[11px] text-gray-400">{selectedTx.sender.country}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Receiver */}
                                <div>
                                    <h4 className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Receiver Information</h4>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarBg(selectedTx.receiver.avatar)}`}>{selectedTx.receiver.avatar}</div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-gray-800 dark:text-white truncate">{selectedTx.receiver.name}</div>
                                            <div className="text-[11px] text-gray-400">{selectedTx.receiver.phone}</div>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <FlagImg country={selectedTx.receiver.country} size="w-3.5 h-3.5" />
                                                <span className="text-[11px] text-gray-400">{selectedTx.receiver.country}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div>
                                    <h4 className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Transaction Timeline</h4>
                                    <div className="relative pl-5">
                                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />
                                        <div className="space-y-4">
                                            {selectedTx.timeline.map((step, i) => {
                                                const isLast = i === selectedTx.timeline.length - 1;
                                                const dotColor = isLast
                                                    ? selectedTx.status === "Failed" ? "bg-red-500" : selectedTx.status === "Refunded" ? "bg-purple-500" : "bg-green-500"
                                                    : "bg-gray-300 dark:bg-gray-600";
                                                return (
                                                    <div key={i} className="relative flex items-start gap-3">
                                                        <span className={`absolute -left-[13px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 shrink-0 ${dotColor}`} />
                                                        <div>
                                                            <div className={`text-xs font-semibold ${isLast && selectedTx.status === "Failed" ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-200"}`}>{step.label}</div>
                                                            <div className="text-[10px] text-gray-400">{step.time}</div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}