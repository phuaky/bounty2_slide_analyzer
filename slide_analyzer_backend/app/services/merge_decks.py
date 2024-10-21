# app/services/merge_decks.py
import os
from PyPDF2 import PdfFileMerger


def merge_approved_decks(output_path='master_deck.pdf'):
    merger = PdfFileMerger()
    decks_dir = 'approved_decks'

    for filename in os.listdir(decks_dir):
        if filename.endswith('.pdf'):
            merger.append(os.path.join(decks_dir, filename))

    merger.write(output_path)
    merger.close()
