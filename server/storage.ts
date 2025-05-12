import { bookings, type Booking, type InsertBooking, contacts, type Contact, type InsertContact } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private bookingId: number;
  private contactId: number;

  constructor() {
    this.bookings = new Map();
    this.contacts = new Map();
    this.bookingId = 1;
    this.contactId = 1;
  }

  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const now = new Date();
    const newBooking: Booking = { 
      ...booking, 
      id, 
      createdAt: now 
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const now = new Date();
    const newContact: Contact = { 
      ...contact, 
      id, 
      createdAt: now 
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
}

// Create and export the storage instance
export const storage = new MemStorage();
