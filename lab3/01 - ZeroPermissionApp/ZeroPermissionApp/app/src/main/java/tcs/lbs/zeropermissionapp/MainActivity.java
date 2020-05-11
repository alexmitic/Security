package tcs.lbs.zeropermissionapp;


import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }



    // TODO Implement this method
    public void ReadData(android.view.View view)
    {
        // TODO Read BSSID here and show it as a Toast Message

        Toast.makeText(this, "Not Implemented Yet!!", Toast.LENGTH_SHORT).show();
    }



    // TODO Implement this method
    public void SendData(android.view.View view)
    {
        // TODO Read BSSID and send it to a server using ACTION_VIEW and HTTP GET parameters
        // TODO For example you can send it to google as a search query

        Toast.makeText(this, "Not Implemented Yet!!", Toast.LENGTH_SHORT).show();
    }
}
