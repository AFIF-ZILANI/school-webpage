"use client"
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader: React.FC = () => {
    const [data, setData] = useState<any[][]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            if (typeof binaryStr !== 'string') return;

            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, {
                defval: null, // Set default value for empty cells
                header: 1, // Use first row as header
                blankrows: false, // Ignore empty rows
            });

            // Filter out empty columns
            const filteredData = jsonData.map((row) =>
                row.filter((cell) => cell !== null)
            );
            setData(filteredData);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            {data.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {data[0].map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(1).map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExcelReader;
