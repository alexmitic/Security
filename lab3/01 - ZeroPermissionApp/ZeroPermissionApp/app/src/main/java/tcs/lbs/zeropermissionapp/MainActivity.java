package tcs.lbs.zeropermissionapp;


import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class MainActivity extends AppCompatActivity
{
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    // TODO Implement this method
    public void ReadData(android.view.View view) throws FileNotFoundException {

        Toast.makeText(this, getBSSID(), Toast.LENGTH_SHORT).show();
    }



    // TODO Implement this method
    public void SendData(android.view.View view) throws FileNotFoundException {
        // TODO Read BSSID and send it to a server using ACTION_VIEW and HTTP GET parameters
        // TODO For example you can send it to google as a search query

        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse("https://www.google.com/search?q=" + getBSSID()));
        startActivity(intent);

        Toast.makeText(this, "Not Implemented Yet!!", Toast.LENGTH_SHORT).show();
    }

    private String getBSSID() throws FileNotFoundException {
        File procFile = new File("/proc/net/arp");

        String bssid = "";

        Scanner sc = new Scanner(procFile);
        while(sc.hasNextLine()){
            String str = sc.nextLine();

            if (str.contains("wlan0")) {
                bssid += str;
                break;
            }
        }

        bssid = bssid.substring(41, 58);

        return bssid;
    }
}
